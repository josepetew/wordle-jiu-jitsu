import json
import os
import random
import logging
from django.http import HttpResponse
from django.conf import settings
from .models import Move, MoveSequence
from django.http import JsonResponse
from rest_framework.decorators import api_view

index_file_path = os.path.join(settings.REACT_APP_DIR, 'out', 'index.html')
def index(request):
    try:
        with open(index_file_path) as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        logging.exception('Production build of app not found')
        return HttpResponse(
            status=501,
        )

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

@api_view(["GET"])
def get_sequence_items(self, **kwargs):
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
    
    
    sequence_to_fill = sequence_data[1:-1].copy()
    random.shuffle(sequence_to_fill)
    data = {
        'start': sequence_data[0],
        'finish': sequence_data[-1],
        'true_sequence': sequence_data,
        'sequence_to_fill': sequence_to_fill,
    }
    return JsonResponse(data)
