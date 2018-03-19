
from django.urls import path

from . import views

urlpatterns = [
    path('followshow/<int:show_id>/', views.FollowShow.as_view(), name='follow_show'),
    path('schedule/<str:date_str>/', views.ScheduleView.as_view(), name='schedule')
]
