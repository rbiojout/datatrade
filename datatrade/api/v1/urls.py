from django.conf.urls import url, include
from django.urls import path

from datatrade.api.v1 import endpoints

app_name = 'datatrade.api'

urlpatterns = [
  url('v1/', include(endpoints)),
 ]
