from django.conf.urls import url, include
from django.urls import path

from api.v1 import endpoints

app_name = 'api_v1'

urlpatterns = [
  url('v1/', include(endpoints)),
 ]
