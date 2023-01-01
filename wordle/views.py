import json
from django.http import HttpResponse
from django.views.generic import TemplateView
from .models import Move, MoveSequence

def index(request):
    return HttpResponse("Hello, world. You're at the wordle main page.")

class WebpackView(TemplateView):
    template_name = "wordle/hello_webpack.html"

    def get_context_data(self, **kwargs):
        sequence = MoveSequence.objects.get(id=1)
        data = [{'a': 'this is a prompt'}, {'b': 'another one'}]
        data = {'head': 'this is a prompt'}
        data = {"prompt": str(sequence)}
        data = [
            ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
            ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
            ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
        ]
        return {'data': json.dumps(data)}
