from django.db import models

class Move(models.Model):
    created_date = models.DateTimeField(
        blank=True, null=True, auto_now_add=True
    )
    updated_date = models.DateTimeField(
        blank=True, null=True, auto_now=True
    )
    name = models.CharField(
        blank=False, null=False, max_length=200
    ) 
    description = models.CharField(
        blank=False, null=False, max_length=200
    ) 

    def __str__(self):
        return f"{self.name}"

class MoveSequence(models.Model):
    created_date = models.DateTimeField(
        blank=True, null=True, auto_now_add=True
    )
    updated_date = models.DateTimeField(
        blank=True, null=True, auto_now=True
    )
    game_id = models.IntegerField()
    starting_position = models.ForeignKey(
        Move, 
        on_delete=models.CASCADE,
        related_name='starting_position',

    )
    position_2 = models.ForeignKey(
        Move,blank=True, null=True, 
        on_delete=models.CASCADE,
        related_name='position_2',
    )
    position_3 = models.ForeignKey(
        Move, blank=True, null=True,
        on_delete=models.CASCADE,
        related_name='position_3',
    )
    position_4 = models.ForeignKey(
        Move, blank=True, null=True,
        on_delete=models.CASCADE,
        related_name='position_4',
    )
    position_5 = models.ForeignKey(
        Move, blank=True, null=True,
        on_delete=models.CASCADE,
        related_name='position_5',
    )
    position_6 = models.ForeignKey(
        Move, blank=True, null=True,
        on_delete=models.CASCADE,
        related_name='position_6',
    )
    position_7 = models.ForeignKey(
        Move, blank=True, null=True,
        on_delete=models.CASCADE,
        related_name='position_7',
    )
    position_8 = models.ForeignKey(
        Move, blank=True, null=True,
        on_delete=models.CASCADE,
        related_name='position_8',
    )
    position_9 = models.ForeignKey(
        Move, blank=True, null=True,
        on_delete=models.CASCADE,
        related_name='position_9',
    )
    ending_position = models.ForeignKey(
        Move, blank=True, null=True,
        on_delete=models.CASCADE,
        related_name='ending_position',
    )

    def __str__(self):
        end_poslist = [
            self.position_2,
            self.position_3,
            self.position_4,
            self.position_5,
            self.position_6,
            self.position_7,
            self.position_8,
            self.ending_position,
        ]
        endpos = ''
        for e in end_poslist:
            if e is None:
                break

            endpos = e.name
                
        return f"{self.game_id}: {self.starting_position}-{endpos}"
