
from django.shortcuts import render

def our_metrics(request):
    return render(request, 'metrics/our_metrics.html')

