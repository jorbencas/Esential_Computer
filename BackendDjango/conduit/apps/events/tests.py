from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory
from django.core.urlresolvers import reverse
from events.models import Event
from events.serializers import EventSerializer
from events.views import EventList
import datetime
import json


def make_django_time(time_to_make):
    base = str(time_to_make).split()
    base = 'T'.join(base)
    base = base[:-6]
    base = base + 'Z'
    return base


class EventDatabaseTest(TestCase):

    def test_event_create(self):
        new_event = Event(title='This is #first @jack event')
        new_event.save()
        self.assertIsInstance(new_event, Event)

    def test_event_retrieve_category_person_time(self):
        test_event = Event(title='@i created this #test')
        test_event.save()
        self.assertEqual(test_event.person, 'i')
        self.assertEqual(test_event.category, 'test')
        self.assertEqual(test_event.time.year, datetime.datetime.now().year)
        self.assertEqual(test_event.time.month, datetime.datetime.now().month)
        self.assertEqual(test_event.time.day, datetime.datetime.now().day)

    def test_event_serializer(self):
        event = Event(title='just for @serializer #test')
        event.save()
        serializer = EventSerializer(event)
        self.assertDictEqual(dict(serializer.data),
                             {'id': 1, 'title': 'just for @serializer #test',
                              'person': 'serializer', 'category': 'test',
                              'time': make_django_time(event.time)})


class EventAPITest(APITestCase):

    def setUp(self):
        self.factory = APIRequestFactory()

    def test_event_list_create(self):
        request = self.factory.post('/events/', {'title': 'Testing #api with @test'})
        view = EventList.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 201)

    def test_event_list_get(self):
        request = self.factory.get('/events/')
        view = EventList.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_event_detail_create(self):
        request = self.factory.post('/events/1/', {'title': 'Testing #api with @test'})
        view = EventList.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 201)

    def test_event_detail_get(self):
        request = self.factory.get('/events/1/')
        view = EventList.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_event_detail_put(self):
        request = self.factory.put('events/112/', {'title': 'Testing #api with @put'})
        view = EventList.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 405)

    def test_event_category_create(self):
        request = self.factory.post('/events/category/', {'title': '#another'})
        view = EventList.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 201)

    def test_event_category_get(self):
        request = self.factory.get('/events/category/')
        view = EventList.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_event_person_create(self):
        request = self.factory.post('/events/category/', {'title': '@test'})
        view = EventList.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 201)

    def test_event_person_get(self):
        request = self.factory.get('/events/category/')
        view = EventList.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_event_time_post(self):
        request = self.factory.post('/events/time/2015/1/1', {'title': '@time with #time'})
        view = EventList.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 201)

    def test_event_time_get(self):
        request = self.factory.get('/events/time/2015/1/1')
        view = EventList.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 200)

    def test_event_create(self):
        url = reverse('events')
        data = {'title': 'real #test @event'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertDictEqual(response.data, {'id': 1, 'title': 'real #test @event',
                                             'category': 'test', 'person': 'event',
                                             'time': response.data['time']})
