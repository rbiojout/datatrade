from django.contrib import admin
from django.db.models import Count

from .models import Portfolio, WeightPortfolio


class WeightPortfolioInline(admin.TabularInline):
    model = WeightPortfolio
    extra = 1 # how many rows to show




@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    inlines = (WeightPortfolioInline,)
    list_display = ("name","ticker_count",)
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
