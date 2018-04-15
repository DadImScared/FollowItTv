
from django.shortcuts import get_object_or_404
from pytv import Schedule
from rest_framework import status, permissions
from rest_framework.views import APIView, Response

from .utility import dict_data
from .models import Show, FollowedShow
from .serializers import ShowSerializer

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


class FollowedShows(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, day=None):
        if day:
            queryset = FollowedShow.objects.filter(show__schedule__days__contains=[day], is_following=True)
        else:
            queryset = FollowedShow.objects.filter(is_following=True)
        results = [ShowSerializer(instance=followed.show).data for followed in queryset]
        return Response(results)


class ScheduleView(APIView):

    def get(self, request, date_str, *args, **kwargs):
        schedule = Schedule(date=date_str)
        return Response([{
                # non matching pattern so all keys return
                **dict_data(episode, 'rht'),
                "show": {
                    "id": episode.show.id,
                    "type": episode.show.type,
                    **dict_data(episode.show)
                }
            } for episode in schedule.episodes])
