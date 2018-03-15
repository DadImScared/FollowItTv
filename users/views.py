
import requests
from rest_framework.views import APIView, Response
from rest_framework.reverse import reverse

# Create your views here.


class AccountConfirm(APIView):
    """View to verify email address"""

    def get(self, request, key, *args, **kwargs):
        """Make post request to verify_email endpoint"""
        requests.post(reverse('rest_verify_email'), data={'key': key})
        return Response()
