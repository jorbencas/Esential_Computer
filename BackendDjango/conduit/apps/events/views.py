from .models import Event
from .serializers import EventSerializer
from rest_framework import generics
import datetime
from rest_framework import viewsets, status

from rest_framework.permissions import IsAuthenticated, IsAdminUser


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    #permission_classes = (IsAuthenticated,)
    #permission_classes = (IsAdminUser,)

class EventList(generics.ListAPIView):
    """ List last 10 events, or create a new one """
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventDetail(generics.RetrieveAPIView):
    """ Retrieve, update or delete a snippet instance """
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventCategoryList(generics.ListCreateAPIView):
    """ List of all events by the same category """
    serializer_class = EventSerializer

    def get_queryset(self):
        type = self.kwargs['type']
        return Event.objects.filter(type=type)


class EventPersonList(generics.ListCreateAPIView):
    """ List of all events by the same person """
    serializer_class = EventSerializer

    def get_queryset(self):
        person = self.kwargs['person']
        return Event.objects.filter(person=person)


class EventTimeList(generics.ListCreateAPIView):
    """ List of all events after provided time """
    serializer_class = EventSerializer

    def get_queryset(self):
        year = self.kwargs['year']
        month = self.kwargs['month']
        day = self.kwargs['day']
        return Event.objects.filter(time__gte=datetime.date(int(year), int(month), int(day)))
