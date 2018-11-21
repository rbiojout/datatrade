from rest_framework import serializers

from datatrade.exchange.models import Ticker, Tick


queryset = Ticker.objects.prefetch_related('company', 'company__name')

class CompanySerializer(serializers.ModelSerializer):
  class Meta:
    model = Ticker
    fields = '__all__'

class TickerSerializer(serializers.ModelSerializer):
  company = serializers.StringRelatedField(many=False)
  exchange = serializers.StringRelatedField(many=False)

  class Meta:
      model = Ticker
      fields = ('id', 'symbol', 'company', 'exchange')



class TickSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tick
        fields = ('date', 'open', 'high', 'low', 'close', 'volume', 'id' )
