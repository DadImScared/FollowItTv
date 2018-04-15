
from django.urls import path

from . import views

urlpatterns = [
    path('followshow/<int:show_id>/', views.FollowShow.as_view(), name='follow_show'),
    path('followedshows/', views.FollowedShows.as_view(), name='followed_shows'),
    path('followedshows/<str:day>/', views.FollowedShows.as_view(), name='followed_shows'),
    path('schedule/<str:date_str>/', views.ScheduleView.as_view(), name='schedule')
]
