import json
from django.http import HttpResponse
from django.views.generic import TemplateView
from .models import Move, MoveSequence

def index(request):
    return HttpResponse("Hello, world. You're at the wordle main page.")


def _get_name(x):
    try:
        return x.name
    except:
        pass

class WebpackView(TemplateView):
    template_name = "wordle/hello_webpack.html"

    def get_context_data(self, **kwargs):
        sequence = MoveSequence.objects.get(id=1)
        positions= [
            sequence.starting_position,
            sequence.position_2, 
            sequence.position_3,
            sequence.position_4,
            sequence.position_5,
            sequence.position_6,
            sequence.position_7,
            sequence.position_8,
            sequence.position_9,
            sequence.ending_position,
        ]
        sequence_data = []
        for p in positions:
            p0 = _get_name(p)
            if p:
                sequence_data.append(p0)

        print(sequence_data)
        data = [{'a': 'this is a prompt'}, {'b': 'another one'}]
        data = {'head': 'this is a prompt'}
        data = {"prompt": str(sequence)}
        data = [
            ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
            ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
            ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
        ]
        return {'data': json.dumps([sequence_data])}
