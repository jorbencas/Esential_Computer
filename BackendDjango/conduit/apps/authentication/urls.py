#from django.conf.urls import url
from django.conf.urls import include, url
from .views import (
    LoginAPIView, RegistrationAPIView, UserRetrieveUpdateAPIView, UserViewSet, RecoverUpdateAPIView
)

#DRF
user_list = UserViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
user_detail = UserViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    url(r'^userlist/$', user_list, name='user_list'),                                       #DRF
    url(r'^userdetail/(?P<username>[0-9a-zA-Z_-]+)/$', user_detail, name='user_detail'),    #DRF
    
    url(r'^user/?$', UserRetrieveUpdateAPIView.as_view()),
    url(r'^users/?$', RegistrationAPIView.as_view()),
    url(r'^user/recover/?$', RecoverUpdateAPIView.as_view()),
    url(r'^users/login/?$', LoginAPIView.as_view()),
]
