from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404

from .models import Company

# Create your views here.

app_name = 'company'
def index(request):
    latest_companies_list = Company.objects.order_by('-id')[:5]
    #output = ', '.join([c.name for c in latest_companies_list])
    context = {
        'latest_companies_list': latest_companies_list,
    }
    return render(request, 'company/index.html', context)

def detail(request, company_id):
    company = get_object_or_404(Company, pk=company_id)
    return render(request, 'company/detail.html', {'company': company})

def events(request, company_id):
    response = "You're looking at the events of company %s."
    return HttpResponse(response % company_id)