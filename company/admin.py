import csv
from django.http import HttpResponse
from django.contrib import admin
from django.db.models import Count

from .models import Industry, Sector, Company, Event, Earning, FiscalPeriod

class ExportCsvMixin:
    def export_as_csv(self, request, queryset):

        meta = self.model._meta
        field_names = [field.name for field in meta.fields]

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename={}.csv'.format(meta)
        writer = csv.writer(response)

        writer.writerow(field_names)
        for obj in queryset:
            row = writer.writerow([getattr(obj, field) for field in field_names])

        return response

    export_as_csv.short_description = "Export Selected"

#admin.site.register(Industry)
@admin.register(Industry)
class IndustryAdmin(admin.ModelAdmin):
    list_display = ("name","company_count",)

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        queryset = queryset.annotate(
            _company_count=Count("company", distinct=True),
        )
        return queryset

    def company_count(self, obj):
        return obj._company_count


#admin.site.register(Sector)
@admin.register(Sector)
class SectorAdmin(admin.ModelAdmin):
    list_display = ("name","company_count",)

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        queryset = queryset.annotate(
            _company_count=Count("company", distinct=True),
        )
        return queryset


    def company_count(self, obj):
        return obj._company_count


#admin.site.register(Company)
@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ("name","symbol","industry","sector",)
    list_filter = ("industry","sector",)
    search_fields = ('name','symbol',)

    readonly_fields = ["industry", "sector",]

    actions = ["export_as_csv"]

#admin.site.register(Earning)
@admin.register(Earning)
class EarningAdmin(admin.ModelAdmin, ExportCsvMixin):
    readonly_fields = [f.name for f in Earning._meta.fields]
    actions = ["export_as_csv"]


admin.site.register(FiscalPeriod)


#admin.site.register(Event)
@admin.register(Event)
class EventAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ("company","category","event_time")
    list_filter = ("category",)

    actions = ["export_as_csv"]
