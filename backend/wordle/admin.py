from django.contrib import admin
from .models import Move, MoveSequence

class MoveAdmin(admin.ModelAdmin):
    pass

class MoveSequenceAdmin(admin.ModelAdmin):
    pass

admin.site.register(Move, MoveAdmin)
admin.site.register(MoveSequence, MoveSequenceAdmin)
