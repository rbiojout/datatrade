from django.db import models


class Industry(models.Model):
    name = models.CharField(max_length=200, unique=True)

    class Meta:
        verbose_name_plural = "industries"

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class Sector(models.Model):
    name = models.CharField(max_length=200, unique=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class FiscalPeriod(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Company(models.Model):
    name = models.CharField(max_length=200)
    symbol = models.CharField(max_length=10, null=True, unique=True)
    website = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    CEO = models.CharField(max_length=100, null=True, blank=True)

    industry = models.ForeignKey(Industry, null=True, blank=True, on_delete=models.SET_NULL)
    sector = models.ForeignKey(Sector, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name_plural = "companies"
        ordering = ['name']

    def __str__(self):
        return self.name

NONE = 0
BTO = 1
DMT = 2
AMC = 3
ANOUNCE_TIME_KEYS = {'None':NONE, 'BTO':BTO, 'DMT':DMT, 'AMC':AMC}

ANNOUNCE_TIME = (
        (NONE, 'N/A'),
        (BTO, 'Before open'),
        (DMT, 'During trading'),
        (AMC, 'After close')
    )

class Earning(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    fiscalPeriod = models.ForeignKey(FiscalPeriod, on_delete=models.CASCADE)
    actualEPS = models.FloatField(default=0.0, null=True)
    consensusEPS = models.FloatField(default=0.0, null=True)
    estimatedEPS = models.FloatField(default=0.0, null=True)
    announceTime = models.IntegerField(default=0, choices=ANNOUNCE_TIME)
    numberOfEstimates = models.IntegerField(default=0, null=True)
    EPSSurpriseDollar = models.FloatField(default=0.0, null=True)
    EPSReportDate = models.DateField(blank=True, null=True)
    fiscalEndDate = models.DateField(blank=True, null=True)
    yearAgo = models.FloatField(default=0.0, null=True)
    yearAgoChangePercent = models.FloatField(default=0.0, null=True)
    estimatedChangePercent = models.FloatField(default=0.0, null=True)

    # second index as small as possible
    class Meta:
        unique_together = (
            'company',
            'fiscalPeriod',
        )



class Event(models.Model):
    SPLIT = 1
    DIVIDEND = 2
    EVENT_CATEGORY = (
        (0, 'N/A'),
        (SPLIT, 'Split (new/old)'),
        (DIVIDEND, 'Dividend')
    )

    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    event_time = models.DateField('event time UTC')
    category = models.IntegerField(default=0, choices=EVENT_CATEGORY)
    value = models.FloatField()

    def __str__(self):
        return self.company.name+" - "+self.EVENT_CATEGORY[self.category][1]+" - "+(self.event_time).strftime('%Y-%m-%d')