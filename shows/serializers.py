
from rest_framework import serializers
from .models import Show


class ShowSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='show_id')
    _links = serializers.JSONField(source='links')
    type = serializers.CharField(source='show_type')

    class Meta:
        model = Show
        exclude = ('links', 'show_id', 'show_type', 'followers')
