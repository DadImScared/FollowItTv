from django.shortcuts import render
from rest_framework.views import APIView, Response

# Create your views here.


class FollowShow(APIView):

    def post(self, request, show_id, *args, **kwargs):
        return Response()
