"""datatrade URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls import url
from django.urls import include, path
from django.views.generic import TemplateView

urlpatterns = [
    path('company/', include('datatrade.company.urls')),
    path('exchange/', include('datatrade.exchange.urls')),
    path('simulation', include('datatrade.simulation.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('datatrade.api.v1.urls')),
    url('reference/', TemplateView.as_view(template_name="reference.html")),
    url('app/', TemplateView.as_view(template_name="app.html")),
]


if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),

        # For django versions before 2.0:
        # url(r'^__debug__/', include(debug_toolbar.urls)),

    ] + urlpatterns


