
import requests
from rest_framework.views import APIView, Response
from rest_framework.reverse import reverse_lazy

# Create your views here.


class AccountConfirm(APIView):
    """View to verify email address"""

    def get(self, request, key, *args, **kwargs):
        """Make post request to verify_email endpoint"""
        requests.post(reverse_lazy('rest_verify_email', request=request), data={'key': key})
        return Response({"message": "success"})
