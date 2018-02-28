from django.conf.urls import include, url
from .views import StripeView

urlpatterns = (
    url(r'^stripe/$', StripeView.as_view(), name='contact'), #http://begin-django1-yomogan.c9users.io:8081/contact/
)
