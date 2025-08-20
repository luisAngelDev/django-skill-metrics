from django.urls import path
from . import views

urlpatterns = [
    path('', views.our_metrics, name='our_metrics'),
]
