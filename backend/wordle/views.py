import os
import random
import logging
from django.http import HttpResponse
from django.conf import settings
from .models import Move, MoveSequence
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser

def index(request):
    return HttpResponse('hello world')

def to_dict(x):
    try:
        return {"id": x.id, "name": x.name}
    except:
        pass
    
def get_sequence(game_id):
    sequence = MoveSequence.objects.get(game_id=game_id)
    positions = [
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
    complete_sequence = [to_dict(obj) for obj in positions]
    sequence_to_fill = complete_sequence[1:-1].copy()
    random.shuffle(sequence_to_fill)
    return complete_sequence, sequence_to_fill

@api_view(["GET"])
def get_sequence_items(self, **kwargs):
    complete_sequence, sequence_to_fill = get_sequence(game_id=1)
    data = {
        'start': complete_sequence[0],
        'finish': complete_sequence[-1],
        'sequence_to_fill': sequence_to_fill
    }
    return JsonResponse(data)

@api_view(["POST"])
def validate_sequence(request):
   user_sequence = JSONParser().parse(request)
   user_sequence_copy = user_sequence.copy()
   complete_sequence, sequence_to_fill = get_sequence(game_id=1)

   expected_sequence = complete_sequence[1:-1]
   for idx, user_sequence_item in enumerate(user_sequence_copy):
    expected_sequence_item = expected_sequence[idx]
    if(user_sequence_item['id'] == expected_sequence_item['id']):
        user_sequence_item['status'] = 'CORRECT'
    else:
        user_sequence_item['status'] = 'MISSPLACED'
    
   return JsonResponse(user_sequence_copy, safe=False)
