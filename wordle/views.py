import json
import random
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

def _get_id(x):
    try:
        return x.id
    except:
        pass

class WebpackView(TemplateView):
    template_name = "wordle/hello_webpack.html"

    def get_context_data(self, **kwargs):
        data = {}
        sequence = MoveSequence.objects.get(game_id=1)
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
        sequence_data, sequence_ids = [], []
        for p in positions:
            p0 = _get_name(p)
            p1 = _get_id(p)
            if p:
                sequence_data.append(p0)
                sequence_ids.append(p1)
        
        n =  10 - len(sequence_data) 
        random_sequence = sequence_data.copy()
        random.shuffle(random_sequence)
        extra_positions = [j for j in Move.objects.exclude(id__in=sequence_ids)]
        random.shuffle(extra_positions)
        for position in extra_positions[0:n]:
            random_sequence.append(position.name)

        random_sequence = [
            random_sequence[0:4], 
            random_sequence[4:9],
            random_sequence[9:],
        ]
        random_sequence[2].append('enter')
        data = {
            'true_sequence': [sequence_data],
            #'random_sequence': [random_sequence],
            'random_sequence': random_sequence,
        }
        print(data)

        return {'data': json.dumps(data)}
