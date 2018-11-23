from django.db import models

from datatrade.exchange.models import Ticker


class Portfolio(models.Model):
    name = models.CharField(max_length=200)
    tickers = models.ManyToManyField(Ticker, through='WeightPortfolio')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-id']

class WeightPortfolio(models.Model):
    portfolio = models.ForeignKey(Portfolio, related_name='weight_portfolio', on_delete=models.CASCADE)
    ticker = models.ForeignKey(Ticker, related_name='weight_portfolio', on_delete=models.CASCADE)
    weight = models.PositiveIntegerField(default=1)

