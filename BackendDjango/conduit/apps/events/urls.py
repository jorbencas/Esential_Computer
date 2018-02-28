from django.conf.urls import url
from .views import EventViewSet, EventList, EventDetail, EventCategoryList, EventTimeList, EventPersonList


event_list = EventViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
event_detail = EventViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    url(r'^events/$', EventList.as_view(), name="events"),
    url(r'^events/(?P<pk>[0-9]+)/$', EventDetail.as_view()),
    url(r'^events/category/(?P<type>\D+)/$', EventCategoryList.as_view()),
    url(r'^events/person/(?P<person>\D+)/$', EventPersonList.as_view()),
    url(r'^events/time/(?P<year>\d+)/(?P<month>\d+)/(?P<day>\d+)/$', EventTimeList.as_view()),
    url(r'^events1/$', event_list, name='event_list'), 
    url(r'^events1/(?P<pk>[0-9]+)/$', event_detail, name='event_detail'), 
]
