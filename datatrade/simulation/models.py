from django.db import models

from datatrade.exchange.models import Ticker


class Simulation(models.Model):
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    tickers = models.ManyToManyField(Ticker, through='WeightSimulation')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class WeightSimulation(models.Model):
    simulation = models.ForeignKey(Simulation, on_delete=models.CASCADE)
    ticker = models.ForeignKey(Ticker, on_delete=models.CASCADE)
    weight = models.IntegerField(default=1)
