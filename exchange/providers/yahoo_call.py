import datetime
import timeit

import exchange.providers.fix_yahoo_finance as yf
import numpy as np
import pandas as pd
from company.models import Company
from django.core import serializers
from django.http import HttpResponse
from exchange.models import Ticker, Tick, Provider, TICK_COLUMNS
from pandas_datareader import data as pdr


yf.pdr_override() # <== that's all it takes :-)

"""
# download dataframe
data = pdr.get_data_yahoo("SPY", start="2017-01-01", end="2017-04-30")

# download Panel
data = pdr.get_data_yahoo(["SPY", "IWM"], start="2017-01-01", end="2017-04-30")

data = pdr.get_data_yahoo(
            # tickers list (single tickers accepts a string as well)
            tickers = ["SPY", "IWM", "..."],

            # start date (YYYY-MM-DD / datetime.datetime object)
            # (optional, defaults is 1950-01-01)
            start = "2017-01-01",

            # end date (YYYY-MM-DD / datetime.datetime object)
            # (optional, defaults is Today)
            end = "2017-04-30",

            # return a multi-index dataframe
            # (optional, default is Panel, which is deprecated)
            as_panel = False,

            # group by ticker (to access via data['SPY'])
            # (optional, default is 'column')
            group_by = 'ticker',

            # adjust all OHLC automatically
            # (optional, default is False)
            auto_adjust = True,

            # download dividend + stock splits data
            # (optional, default is None)
            # options are:
            #   - True (returns history + actions)
            #   - 'only' (actions only)
            actions = True,

            # adjust_dividends: bool, default false
            #If True, adjusts dividends for splits.
            adjust_dividends = True,

            # How may threads to use?
            threads = 10
        )

import exchange.providers.fix_yahoo_finance as yf
data = yf.download("A", start="1980-01-01", auto_adjust = False, actions = True,)
"""

# ['Open', 'High', 'Low', 'Close', 'Adj Close', 'Volume', 'Dividends', 'Stock Splits', 'Adj Volume', 'Adj Open', 'Adj High', 'Adj Low']
COLUMN_MAPPING = {"Date": "date", "Open": "open", "High": "high", "Low": "low", "Close": "close", "Volume": "volume",
                  "Adj Open": "open_adj", "Adj High": "high_adj", "Adj Low": "low_adj", "Adj Close": "close_adj", "Adj Volume": "volume_adj",
            "Dividends": "dividend", "Stock Splits": "splits"}

def fill_ticks(ticker='AAPL'):
    now = datetime.datetime.now()
    start = timeit.default_timer()
    dataset = yf.download(ticker, start="1980-01-01", auto_adjust = False, actions = True,)

    if dataset is None:
        return

    end = timeit.default_timer()
    print('TICKER from Yahho:', ticker, ' Time: ', end - start)

    # Add
    dataset['Adj Volume'] = dataset['Volume']
    dataset['Volume'] = dataset['Adj Volume'] / (dataset.cumprod(0) / dataset.cumprod(0).iloc[-1])['Stock Splits']

    ratio = dataset['Adj Close']/dataset['Close']
    dataset['Adj Open'] = ratio * dataset['Open']
    dataset['Adj High'] = ratio * dataset['High']
    dataset['Adj Low'] = ratio * dataset['Low']

    # print("COLUMNS :", dataset.columns)
    # ['Open', 'High', 'Low', 'Close', 'Adj Close', 'Volume']
    # prepare the columns
    df = dataset.copy()
    # remove rows with NaN element(s)
    df.dropna(axis=0, how='any', inplace=True)
    # add date index as columns
    df['date'] = df.index
    # rename columns
    df = df.rename(index=str, columns=COLUMN_MAPPING)
    # keep only necessary columns
    df = df[TICK_COLUMNS]
    df.index.rename('date', inplace=True)
    df.index = pd.to_datetime(df.index)
    #df['date'] = pd.to_datetime(df.index)
    df['volume'] = df['volume'].astype(np.int64)

    # print(df)

    # recover the stock
    company = Company.objects.filter(symbol=ticker)[0]

    # recover the provider
    try:
        yahoo_provider = Provider.objects.filter(name="yahoo")[0]
    except IndexError:
        yahoo_provider = Provider.objects.create(name="yahoo")
        yahoo_provider.save()

    # look for missing dates
    # print(TICK_COLUMNS.copy().insert(0, 'id'))
    ticks_db = Tick.objects.filter(company=company, provider=yahoo_provider
                                    #, date__gte=datetime.date(2017, 7, 28)
                                    ).values('id', 'date', 'open', 'high', 'low', 'close', 'volume', 'open_adj', 'high_adj', 'low_adj', 'close_adj', 'volume_adj', 'dividend', 'splits')
    # dates_db = [e.date for e in ticks_db]
    # dates_request = [x.date() for x in df['date']]
    # get objects of dates_request not in dates_db
    # dates_to_persist = set(dates_request).difference(set(dates_db))


    if len(ticks_db)==0:
        # create all
        Tick.objects.bulk_create(
            Tick(company=company, provider=yahoo_provider, **vals) for vals in
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
            Tick(company=company, provider=yahoo_provider, **vals) for vals in
            data_to_insert.to_dict('records')
        )

        ## need to be updated
        #print("result ", result)
        #print("CHANGE",result[(result['delta']!=0.0)])
        temp_to_update = result[(result['delta'].abs()>1e-5) & (result['close_y'].notnull())]
        #index_to_update = df.index.difference(temp_to_update.index)
        data_to_update = df.loc[temp_to_update.index.values]

        #print("data_to_update ",data_to_update)
        print("data to update :", data_to_update.shape[0])
        if len(data_to_update)>0:
            # need to add id of existing objects
            data_to_update['id'] = df_db['id']

            data_update_db = [Tick(company=company, provider=yahoo_provider, **vals) for vals in data_to_update.to_dict('records')]
            for item in data_update_db:
                item.save()

            #df_db.sort_index(inplace=True)
            #df.sort_index(inplace=True)


def create_tickers(request):
    tickers = Ticker.objects.all()
    for item in tickers:
        start = timeit.default_timer()
        ticker = item.symbol
        print("*********** start with ticker ", ticker)

        fill_ticks(ticker)
        end = timeit.default_timer()
        print("persist ticker ", ticker, ' Time: ', end - start)

    response = "Request finished. {}".format(ticker)
    return HttpResponse(response)