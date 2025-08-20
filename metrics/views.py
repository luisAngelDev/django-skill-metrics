
from django.shortcuts import render
# Create your views here.

def our_metrics(request):
    return render(request, 'metrics/our_metrics.html')

