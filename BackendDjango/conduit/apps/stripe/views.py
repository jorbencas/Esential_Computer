from django.core.mail import send_mail, BadHeaderError
from rest_framework import permissions, status, views, viewsets
from django.http import HttpResponse, HttpResponseRedirect
from rest_framework.response import Response
from django.conf import settings
import stripe

class StripeView(views.APIView): 

    stripe.api_key = settings.STRIPE_SECRET_KEY

    def post(self, request, format=None):
        data = request.data
        print '**********************************'
        print data
        print '**********************************'
        dades = data.get('stripeToken', None)
        print '**********************************'
        ids = dades.get('id', None)
        print ids
        token = dades.get('stripeToken', None)
        print token
        print '**********************************'

        try:
            # Charge the user's card:
            charge = stripe.Charge.create(
            amount=999,
            currency="usd",
            description="Example charge",
            source=token,
            )
        
            if charge:
                send_mail('Noficacion del pago', 'El pago de ' + 'se ha realizado correctamente', 'esencialcomputers@gmail.com', ['segui.guerola@gmail.com'])
            

        except BadHeaderError:
            return Response({
                    'status': 'false',
                    'message': 'BadHeaderError for your message'
                }, status=status.HTTP_503_SERVICE_UNAVAILABLE)

       
        return Response({
                    'status': 'true',
                    'message': 'Success! Thank you for your message'
                    
            }, status=status.HTTP_200_OK)