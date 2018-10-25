from django.db import models

from exchange.models import Ticker

class Simulation(models.Model):
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    tickers = models.ManyToManyField(Ticker)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

