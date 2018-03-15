
from django.shortcuts import get_object_or_404
from rest_framework import status, permissions
from rest_framework.views import APIView, Response

from .models import Show, FollowedShow

# Create your views here.


class FollowShow(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, show_id, *args, **kwargs):
        show = get_object_or_404(Show, show_id=show_id)
        followed_show, created = FollowedShow.objects.get_or_create(
            show=show,
            user=request.user
        )
        if created:
            return Response("Following show", status=status.HTTP_201_CREATED)
        else:
            followed_show.is_following = not followed_show.is_following
            followed_show.save()
            return Response(f"{'following' if followed_show.is_following else 'un followed'} show")
