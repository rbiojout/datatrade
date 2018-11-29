from rest_framework import status
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import authentication_classes, permission_classes, action
from rest_framework.permissions import AllowAny

from django.shortcuts import get_object_or_404

from datatrade.api.v1.serializers import TickerSerializer, TickSerializer, PortfolioSerializer, WeightPortfolioSerializer
from datatrade.exchange.models import Ticker, Tick, Provider
from datatrade.simulation.models import Portfolio, WeightPortfolio


class PortfolioViewSet(viewsets.ModelViewSet):
    # use prefetch to speed-up requests
    queryset = Portfolio.objects.all().prefetch_related('tickers')
    permission_classes = [permissions.AllowAny, ]
    serializer_class = PortfolioSerializer


    def create(self, request, *args, **kwargs):
        permission_classes = (AllowAny,)
        print("GOT A CREATE REQUEST")
        portfolio = Portfolio()
        serializer = PortfolioSerializer(data=request.data)
        if serializer.is_valid():
            portfolio.name=serializer.data['name']
            portfolio.save()
            # send back the result of the persisted object
            serializer = PortfolioSerializer(portfolio)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        permission_classes = (AllowAny,)
        queryset = Portfolio.objects.all()
        portfolio = get_object_or_404(queryset, pk=pk)
        portfolio.delete()
        return Response()


    @action(detail=True, methods=['get'])
    def weight_portfolios(self, request, *args, **kwargs):
        permission_classes = (AllowAny,)
        portfolio = self.get_object()
        portfolio_id = portfolio.id
        portfolio = Portfolio.objects.get(id=portfolio_id)
        weightPortfolios = WeightPortfolio.objects.filter(portfolio=portfolio).all()
        serializer = WeightPortfolioSerializer(weightPortfolios, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def add_ticker(self, request, *args, **kwargs):
        permission_classes = (AllowAny,)
        portfolio = self.get_object()
        portfolio_id = portfolio.id
        portfolio = Portfolio.objects.get(id=portfolio_id)
        ticker = Ticker.objects.get(symbol=request.data['ticker'])
        weight = request.data['weight']
        # test if existing weight
        existingWeight = WeightPortfolio.objects.filter(portfolio=portfolio, ticker=ticker).all()
        if (len(existingWeight)>0):
            serializer = WeightPortfolioSerializer(existingWeight[0], many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)

        data = {'portfolio': portfolio_id, 'ticker': ticker, 'weight': weight}
        serializer = WeightPortfolioSerializer(data=data)
        if serializer.is_valid():
            weightPortfolio = WeightPortfolio(portfolio= portfolio, ticker= ticker, weight= weight)
            weightPortfolio.save()
            # send back the result of the persisted object
            serializer = WeightPortfolioSerializer(weightPortfolio)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'])
    def update_ticker(self, request, *args, **kwargs):
        permission_classes = (AllowAny,)
        portfolio = self.get_object()
        try:
            weightPortfolio = WeightPortfolio.objects.get(id=request.data['id'])
            # @TODO check if object is linked to portfolio
            if (weightPortfolio.portfolio.id != portfolio.id):
                return Response({}, status=status.HTTP_403_FORBIDDEN)
            weightPortfolio.weight = request.data.weight
            weightPortfolio.save()
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'status': 'error'},
                            status=status.HTTP_400_BAD_REQUEST)


    @action(detail=True, methods=['delete'])
    def del_ticker(self, request, *args, **kwargs):
        permission_classes = (AllowAny,)
        portfolio = self.get_object()
        try:
            weightPortfolio = WeightPortfolio.objects.get(id=request.data['id'])
            # @TODO check if object is linked to portfolio
            if (weightPortfolio.portfolio.id != portfolio.id):
                return Response({}, status=status.HTTP_403_FORBIDDEN)
            weightPortfolio.delete()
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'status':'error'},
                            status=status.HTTP_400_BAD_REQUEST)

class TickerViewSet(viewsets.ModelViewSet):
    # use prefetch to speed-up requests
    queryset = Ticker.objects.all().prefetch_related('company').prefetch_related('exchange')
    permission_classes = [permissions.AllowAny, ]
    serializer_class = TickerSerializer
    lookup_field = 'symbol'


@api_view(['GET'])
def ticks_list(request, tickerSymbol):
    """
    List all ticks for a ticker symbol.
    """
    if request.method == 'GET':
      try:
        ticker = Ticker.objects.get(symbol= tickerSymbol)
        company = ticker.company
        provider = Provider.objects.get(name= 'yahoo')
        ticks = Tick.objects.filter(company= company, provider=provider).order_by('date')
        serializer = TickSerializer(ticks, many=True)
        return Response(serializer.data)
      except Exception as e:
          print(e)
          return Response(None, status=status.HTTP_400_BAD_REQUEST)

