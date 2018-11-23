# for reverse urls could be usefull to use
# $./manage.py show_urls
from django.urls import include, path, reverse
from rest_framework import status
from rest_framework.test import APITestCase, URLPatternsTestCase


class TickersTests(APITestCase, URLPatternsTestCase):
    fixtures = ['industry', 'sector', 'company', 'ticker', 'provider', 'exchange']

    urlpatterns = [
        path('api/', include('datatrade.api.v1.urls')),
    ]

    def test_access_tickers(self):
        """
        Ensure we can create a new account object.
        """
        url = reverse('datatrade.api:ticker-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TicksTests(APITestCase, URLPatternsTestCase):
    fixtures = ['industry', 'sector', 'company', 'ticker', 'provider', 'exchange', 'AAPL_tick.json']
    urlpatterns = [
        path('api/', include('datatrade.api.v1.urls')),
    ]

    def test_access_tickers(self):
        """
        Ensure we can create a new account object.
        """
        url = reverse('datatrade.api:ticks-for-ticker', kwargs={'tickerSymbol':'AAPL'})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
