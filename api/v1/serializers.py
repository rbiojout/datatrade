from rest_framework import serializers

from exchange.models import Ticker, Tick


class TickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticker
        fields = ('id', 'symbol', 'company', 'exchange')




class TickSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tick
        fields = ('id', 'date', 'open', 'high', 'low', 'close', 'volume')
