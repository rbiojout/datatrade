from django.urls import path

from . import views

app_name = 'company'

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:company_id>/', views.detail, name='detail'),
    path('<int:company_id>/events/', views.events, name='events'),
]