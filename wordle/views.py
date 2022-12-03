from django.http import HttpResponse
from django.views.generic import TemplateView

def index(request):
    return HttpResponse("Hello, world. You're at the wordle main page.")

class WebpackView(TemplateView):
    template_name = "wordle/hello_webpack.html"
