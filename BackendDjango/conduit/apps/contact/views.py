from django.core.mail import send_mail, BadHeaderError
from rest_framework import permissions, status, views, viewsets
from django.http import HttpResponse, HttpResponseRedirect
from rest_framework.response import Response


class ContactView(views.APIView): 
    def post(self, request, format=None):
        data = request.data
        print '**********************************'
        print data
        print '**********************************'
        dades = data.get('dades', None)
        print dades
        print '**********************************'
        
        email = dades.get('inputEmail', None)
        print email
        print '**********************************'
        name = dades.get('inputName', None)
        print name
        print '**********************************'
        message = dades.get('inputMessage', None)
        print message
        print '**********************************'
        subject = dades.get('inputSubject', None)
        print subject
        print '**********************************'
        
        try:
            send_mail(subject, message, 'segui.guerola@gmail.com', [email])
        except BadHeaderError:
            return Response({
                    'status': 'false',
                    'message': 'BadHeaderError for your message'
                }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        
        return Response({
                    'status': 'true',
                    'message': 'Success! Thank you for your message'
            }, status=status.HTTP_200_OK)
