from django.forms import widgets
from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'name', 'type', 'price', 'status', 'marca', 'date', 'picture', 'description', 'shop')
