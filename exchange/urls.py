from django.urls import path

from .providers import iex_call, quandl_call, yahoo_call

app_name = 'exchange'

urlpatterns = [
  path('iex/create_tickers/', iex_call.create_tickers, name='iex_create_tickers'),
  path('quandl/create_tickers/', quandl_call.create_tickers, name='quandl_create_tickers'),
  path('yahoo/create_tickers/', yahoo_call.create_tickers, name='yahoo_create_tickers'),
 ]
