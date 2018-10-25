from django.contrib import admin
from django.db.models import Count

from .models import Exchange, Provider, Ticker, Tick


#admin.site.register(Exchange)
@admin.register(Exchange)
class ExchangeAdmin(admin.ModelAdmin):
    list_display = ("name","provider_count",)

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        queryset = queryset.annotate(
            _provider_count=Count("provider", distinct=True),
        )
        return queryset

    def provider_count(self, obj):
        return obj._provider_count

    provider_count.admin_order_field = '_provider_count'

#admin.site.register(Provider)
@admin.register(Provider)
class ProviderAdmin(admin.ModelAdmin):
    list_display = ("name","home_url",)

@admin.register(Ticker)
class TickerAdmin(admin.ModelAdmin):
    list_display = ("symbol","company",)
    search_fields = ["symbol", ]

@admin.register(Tick)
class TickAdmin(admin.ModelAdmin):
    list_display = ("company","provider","date",)
    list_filter = ("provider","company",)
    search_fields = ["company", ]
    ordering = ['-date']
    readonly_fields = [f.name for f in Tick._meta.fields]
