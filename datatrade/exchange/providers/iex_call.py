import datetime
from django.core import serializers
from django.db import models
from django.http import HttpResponse

from datatrade.company.models import Company, Industry, Sector, Earning, FiscalPeriod, ANOUNCE_TIME_KEYS
from datatrade.exchange.models import Ticker, Exchange, Tick, Provider
from datatrade.exchange.providers import iex


def clean_db():
    # get the list of symbols
    available_symbols = iex.get_available_symbols()

    Ticker.objects.all().delete()
    Company.objects.all().delete()



def build_companies():
    # get the list of symbols
    available_symbols = iex.get_available_symbols()

    for item in available_symbols:
        symbol = item['symbol']
        name = item['name']
        date = item['date']
        isEnabled = item['isEnabled']
        type = item['type']
        iexId = item['iexId']

        # insert only companies, not ETF or Bitcoins
        if type=='cs':
            #print(type(str(symbol_str)))
            stock = iex.Stock(symbols=symbol)
            company = stock.get_company()

            # INDUSTRY
            industry = company['industry']
            print("INDUSTRY ", industry)
            try:
                industry_db = Industry.objects.filter(name=industry)[0]
            except IndexError:
                industry_db = Industry.objects.create(name=industry)

            # SECTOR
            sector = company['sector']
            try:
                sector_db = Sector.objects.filter(name=sector)[0]
            except IndexError:
                sector_db = Sector.objects.create(name=sector)

            try:
                company_db = Company.objects.get(symbol=symbol)
                company_db.name = name
                company_db.website = company['website']
                company_db.description = description=company['description']
                company_db.CEO = CEO=company['CEO']
                company_db.industry = industry_db
                company_db.sector = sector_db
                company_db.save()
            except Company.DoesNotExist:
                company_db = Company.objects.create(name=name, symbol=symbol, website= company['website'],
                                                    description= company['description'], CEO= company['CEO'],
                                                    industry=industry_db, sector=sector_db)

            # EXCHANGE
            exchange = company['exchange']
            try:
                exchange_db = Exchange.objects.filter(name=exchange)[0]
            except IndexError:
                exchange_db = Exchange.objects.create(name=exchange)

            print("EXCHANGE ", exchange_db)
            # TICKER
            try:
                ticker_db = Ticker.objects.get(symbol=symbol)
                ticker_db.company=company_db
                ticker_db.exchange = exchange_db
                ticker_db.save()
            except Ticker.DoesNotExist:
                ticker_db = Ticker.objects.create(symbol=symbol, company=company_db, exchange=exchange_db)
        else:
            try:
                company = Company.objects.filter(name=name)
                company.delete()
            except:
                pass

    return len(available_symbols)

def string_to_date(date_string):
    print("date_string --'", date_string, "'--",date_string==' None ')
    if date_string is None:
        return None
    else:
        return datetime.datetime.strptime(date_string, "%Y-%m-%d")

def import_earnings():
    companies = Company.objects.all()
    for company_db in companies:
        symbol = company_db.symbol
        stock = iex.Stock(symbols=symbol)

        earnings = stock.get_earnings()
        for earning in earnings:
            print("earning ",earning)
            fiscalPeriod = earning['fiscalPeriod']
            print("=======fiscalPeriod ", fiscalPeriod)
            if fiscalPeriod is not None:
                try:
                    fiscalPeriod_db = FiscalPeriod.objects.filter(name=fiscalPeriod)[0]
                except IndexError:
                    fiscalPeriod_db = FiscalPeriod.objects.create(name=fiscalPeriod)

                try:
                    earning_db = Earning.objects.filter(company=company_db, fiscalPeriod=fiscalPeriod_db)[0]
                    earning_db.actualEPS = earning['actualEPS']
                    earning_db.consensusEPS = earning['consensusEPS']
                    earning_db.estimatedEPS = earning['estimatedEPS']
                    earning_db.announceTime = ANOUNCE_TIME_KEYS[earning['announceTime']] if earning['announceTime'] else 0
                    earning_db.numberOfEstimates = earning['numberOfEstimates']
                    earning_db.EPSSurpriseDollar = earning['EPSSurpriseDollar']
                    earning_db.EPSReportDate = string_to_date(earning['EPSReportDate']) #time
                    earning_db.fiscalEndDate = earning['fiscalEndDate'] #time
                    if 'yearAgo' in earning.keys():
                        earning_db.yearAgo = earning['yearAgo']
                        earning_db.yearAgoChangePercent = earning['yearAgoChangePercent']
                        earning_db.estimatedChangePercent = earning['estimatedChangePercent']
                    earning_db.save()

                except IndexError:
                    earning_db = Earning.objects.create(company=company_db, fiscalPeriod=fiscalPeriod_db,
                                                          actualEPS=earning['actualEPS'], consensusEPS = earning['consensusEPS'],
                                                          estimatedEPS = earning['estimatedEPS'],
                                                          announceTime = ANOUNCE_TIME_KEYS[earning['announceTime']] if earning['announceTime'] else 0 ,
                                                          numberOfEstimates = earning['numberOfEstimates'], EPSSurpriseDollar = earning['EPSSurpriseDollar'],
                                                          EPSReportDate = string_to_date(earning['EPSReportDate']), fiscalEndDate = earning['fiscalEndDate'],

                                                          )
                    if 'yearAgo' in earning.keys():
                        earning_db.yearAgo = earning['yearAgo']
                        earning_db.yearAgoChangePercent = earning['yearAgoChangePercent']
                        earning_db.estimatedChangePercent = earning['estimatedChangePercent']
                    earning_db.save()
                print("Created earning ", earning_db)

def import_chart():
    apple = Company.objects.filter(symbol='AAPL')[0]
    chart = iex.get_historical_data(symbols='AAPL')
    data = chart['AAPL']

    try:
        iex_provider = Provider.objects.filter(name="iex")[0]
    except IndexError:
        iex_provider = Provider.objects.create(name="iex")
        iex_provider.save()

    for date_tick in data.keys():
        date = string_to_date(date_tick)

        try:
            tick_db = Tick.objects.filter(company=apple, provider=iex_provider, date=date)[0]
        except IndexError:
            tick_db = Tick.objects.create(company=apple, provider=iex_provider, date=date,
                                          open=data[date_tick]['open'], high=data[date_tick]['high'],
                                          low=data[date_tick]['low'], close=data[date_tick]['close'],
                                          volume=data[date_tick]['volume'])
            tick_db.save()

    ticks = serializers.json.Deserializer(chart)
    print("ticks", ticks)

def create_tickers(request):
    # clean_db()
    available_symbols = build_companies()
    #import_earnings()
    import_chart()
    response = "Request finished."
    return HttpResponse(response)
