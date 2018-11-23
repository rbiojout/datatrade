from django.conf.urls import include, url
from django.urls import path

from rest_framework import routers

from datatrade.api.v1.api import PortfolioViewSet, TickerViewSet, ticks_list

router = routers.DefaultRouter()
router.register('portfolios', PortfolioViewSet)
router.register('tickers', TickerViewSet)


urlpatterns = [
    url(r'tickers/(?P<tickerSymbol>[-\w]+)/ticks?/$', ticks_list, name='ticks-for-ticker'),
    url("^", include(router.urls)),
]

