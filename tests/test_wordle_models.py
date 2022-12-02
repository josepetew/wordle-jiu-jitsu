from django.test import TestCase
from wordle.models import Move, MoveSequence

class MoveTestCase(TestCase):
    def setUp(self):
        Move.objects.create(
            name='armbar', 
            description='An armlock in grappling is a single or double joint lock that hyperextends, hyperflexes or hyperrotates the elbow joint or shoulder joint'
        )
        for i in range(2, 11):
            Move.objects.create(
                name=f'position_{i}', 
                description=f'another random move {i}'
            )

    def test_move_model(self):
        move = Move.objects.get(name='armbar')
        self.assertEqual(move.description, 'An armlock in grappling is a single or double joint lock that hyperextends, hyperflexes or hyperrotates the elbow joint or shoulder joint')

    def test_full_sequence_creation(self):
        MoveSequence.objects.create(
            game_id=1,
            starting_position=Move.objects.get(name='armbar'),
            position_2=Move.objects.get(name='position_2'),
            position_3=Move.objects.get(name='position_3'),
            position_4=Move.objects.get(name='position_4'),
            position_5=Move.objects.get(name='position_5'),
            position_6=Move.objects.get(name='position_6'),
            position_7=Move.objects.get(name='position_7'),
            position_8=Move.objects.get(name='position_8'),
            position_9=Move.objects.get(name='position_9'),
            ending_position=Move.objects.get(name='position_10'),
        )
        sequence= MoveSequence.objects.get(game_id=1)
        print(str(sequence))
        self.assertEqual(str(sequence), '1: armbar-position_10')

    def test_partial_sequence_creation(self):
        MoveSequence.objects.create(
            game_id=1,
            starting_position=Move.objects.get(name='armbar'),
            position_2=Move.objects.get(name='position_2'),
            position_3=Move.objects.get(name='position_3'),
            position_4=Move.objects.get(name='position_4'),
            position_5=Move.objects.get(name='position_5'),
            position_6=Move.objects.get(name='position_6'),
        )
        sequence= MoveSequence.objects.get(game_id=1)
        self.assertEqual(str(sequence), '1: armbar-position_6')


