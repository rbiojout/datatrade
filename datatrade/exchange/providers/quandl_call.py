# cf https://techoverflow.net/2018/01/16/downloading-reading-a-zip-file-in-memory-using-python/


import datetime
import io
import numpy as np
import pandas as pd
import requests
import zipfile
from django.core import serializers
from django.http import HttpResponse

import quandl
from datatrade.company.models import Company
from datatrade.exchange.models import Tick, Provider, TICK_COLUMNS

QUANDL_KEY = 'Mg3MbahVgbYfYoyPfs9a'
quandl.ApiConfig.api_key = QUANDL_KEY

FREE_DATABASE = ['WIKI', 'EURONEXT', ]

COLUMN_MAPPING = {
    "WIKI":{"Date": "date", "Open": "open", "High": "high", "Low": "low", "Close": "close", "Volume": "volume",
                  "Adj. Open": "open_adj", "Adj. High": "high_adj", "Adj. Low": "low_adj", "Adj. Close": "close_adj", "Adj. Volume": "volume_adj",
            "Ex-Dividend": "dividend", "Split Ratio": "splits"},
    'EURONEXT':{"Open": "open", "High": "high", "Low": "low", 'Last': 'close', 'Volume': 'volume'}

}


def download_extract_zip(url):
    """
    Download a ZIP file and extract its contents in memory
    yields (filename, file-like object) pairs
    """
    response = requests.get(url)
    with zipfile.ZipFile(io.BytesIO(response.content)) as thezip:
        for zipinfo in thezip.infolist():
            with thezip.open(zipinfo) as thefile:
                yield zipinfo.filename, thefile

def query_data(database_name = 'WIKI'):
    database = quandl.Database(database_name)

    #added = database.data_fields()

    """
    Download a ZIP file and extract its contents in memory
    yields (filename, file-like object) pairs
    """
    url = 'https://www.quandl.com/api/v3/databases/' + database_name + '/metadata?api_key=' + QUANDL_KEY

    # recover the components from the database
    database_meta = pd.read_csv(url, compression='zip')

    return database_meta


def fill_ticks(database_name= 'WIKI', ticker='AAPL'):

    dataset = quandl.get(database_name + '/' + ticker)

    #print("COLUMNS :", dataset.columns)
    # prepare the columns
    df = dataset.copy()
    # remove rows with NaN element(s)
    df.dropna(axis=0, how='any', inplace=True)
    # add date index as columns
    df['date'] = df.index
    # rename columns
    df = df.rename(index=str, columns=COLUMN_MAPPING[database_name])
    # keep only necessary columns
    df = df[TICK_COLUMNS]
    df.index.rename('date', inplace=True)
    df.index = pd.to_datetime(df.index)
    #df['date'] = pd.to_datetime(df.index)
    df['volume'] = df['volume'].astype(np.int64)

    print(df)

    # recover the stock
    company = Company.objects.filter(symbol=ticker)[0]

    # recover the provider
    try:
        quandl_provider = Provider.objects.filter(name="quandl")[0]
    except IndexError:
        quandl_provider = Provider.objects.create(name="quandl")
        quandl_provider.save()

    # look for missing dates
    print(TICK_COLUMNS.copy().insert(0, 'id'))
    ticks_db = Tick.objects.filter(company=company, provider=quandl_provider
                                    #, date__gte=datetime.date(2017, 7, 28)
                                    ).values('id', 'date', 'open', 'high', 'low', 'close', 'volume', 'open_adj', 'high_adj', 'low_adj', 'close_adj', 'volume_adj', 'dividend', 'splits')
    # dates_db = [e.date for e in ticks_db]
    # dates_request = [x.date() for x in df['date']]
    # get objects of dates_request not in dates_db
    # dates_to_persist = set(dates_request).difference(set(dates_db))


    if len(ticks_db)==0:
        # create all
        Tick.objects.bulk_create(
            Tick(company=company, provider=quandl_provider, **vals) for vals in
            df.to_dict('records')
        )
    else:
        # create or update
        df_db = pd.DataFrame.from_records(ticks_db)
        df_db['date'] = pd.to_datetime(df_db['date'])
        df_db.set_index('date', inplace=True)

        # adjust order
        #df = df[df_db.columns]


        ## compare db to data collected
        result = pd.merge(df, df_db, how='left', left_index=True, right_index=True)
        ## keep track for changes
        result['delta'] = (result['open_x']-result['open_y']) + (result['high_x']-result['high_y']) \
                          + (result['low_x']-result['low_y'])+result['close_x']-result['close_y'] \
                          + (result['open_adj_x']-result['open_adj_y']) + (result['high_adj_x']-result['high_adj_y']) \
                          + (result['low_adj_x'] - result['low_adj_y']) + result['close_adj_x'] - result['close_adj_y']

        ## need to be inserted
        temp_to_insert = result[result['close_y'].isnull()]
        data_to_insert = df.loc[temp_to_insert.index.values]

        #print("data_to_insert ",data_to_insert)
        Tick.objects.bulk_create(
            Tick(company=company, provider=quandl_provider, **vals) for vals in
            data_to_insert.to_dict('records')
        )

        ## need to be updated
        #print("result ", result)
        #print("CHANGE",result[(result['delta']!=0.0)])
        temp_to_update = result[(result['delta']!=0.0) & (result['close_y'].notnull())]
        #index_to_update = df.index.difference(temp_to_update.index)
        data_to_update = df.loc[temp_to_update.index.values]

        print("data_to_update ",data_to_update)
        if len(data_to_update)>0:
            # need to add id of existing objects
            data_to_update['id'] = df_db['id']

            data_update_db = [Tick(company=company, provider=quandl_provider, **vals) for vals in data_to_update.to_dict('records')]
            for item in data_update_db:
                item.save()

            #df_db.sort_index(inplace=True)
            #df.sort_index(inplace=True)






def fill_ticks_old(database_name= 'WIKI', ticker='AAPL'):
    dataset = quandl.get(database_name + '/' + ticker)

    print("COLUMNS :", dataset.columns)
    # prepare the columns
    df = dataset.copy()
    # add date index as columns
    df['date'] = df.index
    # rename columns
    df = df.rename(index=str, columns=COLUMN_MAPPING[database_name])
    # keep only necessary columns
    df = df[['date', 'open', 'high', 'low', 'close', 'volume']]

    df.index.rename('date', inplace=True)

    print(df)

    # recover the stock
    company = Company.objects.filter(symbol=ticker)[0]

    # recover the provider
    try:
        quandl_provider = Provider.objects.filter(name="quandl")[0]
    except IndexError:
        quandl_provider = Provider.objects.create(name="quandl")
        quandl_provider.save()

    # look for missing dates
    ticks_db = Tick.objects.filter(company=company, provider=quandl_provider)
    dates_db = [e.date for e in ticks_db]
    dates_request = [x.date() for x in df['date']]

    # get objects of dates_request not in dates_db
    dates_to_persist = set(dates_request).difference(set(dates_db))

    Tick.objects.bulk_create(
        Tick(company=company, provider=quandl_provider, **vals) for vals in
        df[df['date'].isin(dates_to_persist)].to_dict('records')
    )


def create_tickers(request):
    database_name = 'WIKI'

    database_meta = query_data(database_name=database_name)

    print("DATA code :",database_meta['code'])

    ticker = database_meta['code'][10]

    fill_ticks(database_name, ticker)



    """
    ds = database.datasets()
    for item in ds:
        print(item.data_fields())
    
    page = 1
    
    while ds.has_more_results():
        ds = database.datasets(params={ 'page': page })
        for item in ds:
            print(item.database_code, item.fremium)
        page = page + 1
    """
    response = "Request finished. {} {}".format(ticker, database_meta['code'])
    return HttpResponse(response)
