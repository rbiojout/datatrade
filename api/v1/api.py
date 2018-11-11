from rest_framework import viewsets, permissions

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.v1.serializers import TickerSerializer, TickSerializer
from exchange.models import Ticker, Tick, Provider


class TickerViewSet(viewsets.ModelViewSet):
    queryset = Ticker.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = TickerSerializer

@api_view(['GET'])
def ticks_list(request, tickerSymbol):
    """
    List all ticks for a ticker symbol.
    """
    if request.method == 'GET':
      try:
        ticker = Ticker.objects.get(symbol= tickerSymbol)
        print('ticker ', ticker)
        company = ticker.company
        print('company ', company)

        provider = Provider.objects.get(name= 'yahoo')
        print('provider ', provider)

        ticks = Tick.objects.filter(company= company, provider=provider).order_by('date')
        serializer = TickSerializer(ticks, many=True)
        return Response(serializer.data)
      except:
        return Response(None, status=status.HTTP_400_BAD_REQUEST)


class TickViewSet(viewsets.ModelViewSet):
    queryset = Tick.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = TickSerializer
