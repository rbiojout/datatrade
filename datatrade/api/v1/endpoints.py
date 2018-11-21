from django.conf.urls import include, url
from django.urls import path

from rest_framework import routers

from datatrade.api.v1.api import TickerViewSet, TickViewSet, ticks_list

router = routers.DefaultRouter()
router.register('ticks', TickViewSet)
router.register('tickers', TickerViewSet)


urlpatterns = [
    path('ticker3/<int:pk>', ticks_list),
]


urlpatterns = [
    path('ticksByTicker/<str:tickerSymbol>', ticks_list, name='ticks-for-ticker'),
    url("^", include(router.urls)),
]

