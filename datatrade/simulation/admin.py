from django.contrib import admin
from django.db.models import Count

from .models import Simulation

@admin.register(Simulation)
class SimulationAdmin(admin.ModelAdmin):
    list_display = ("start_date","end_date","ticker_count",)
    search_fields = ["tickers",]
    autocomplete_fields = ['tickers',]

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        queryset = queryset.annotate(
            _ticker_count=Count("tickers", distinct=True),
        )
        return queryset

    def ticker_count(self, obj):
        return obj._ticker_count