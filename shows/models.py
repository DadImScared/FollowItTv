from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField
from django.conf import settings

# Create your models here.


class Show(models.Model):
    """Model for Tv shows"""
    name = models.TextField()
    show_id = models.IntegerField()
    url = models.URLField()
    show_type = models.TextField(null=True)
    language = models.TextField(null=True)
    genres = ArrayField(models.TextField(null=True, blank=True))
    status = models.TextField()
    runtime = models.IntegerField(null=True)
    premiered = models.DateField(null=True)
    officialSite = models.URLField(max_length=400, null=True, blank=True)
    schedule = JSONField()
    rating = JSONField()
    weight = models.IntegerField()
    network = JSONField(null=True)
    webChannel = JSONField(null=True)
    externals = JSONField(null=True)
    image = JSONField(null=True)
    summary = models.TextField(null=True)
    updated = models.TextField()
    links = JSONField(null=True)
    followers = models.ManyToManyField(settings.AUTH_USER_MODEL, through='FollowedShow')

    class Meta:
        ordering = ['show_id']


class FollowedShow(models.Model):
    show = models.ForeignKey(Show, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_following = models.BooleanField(default=True)
    followed_at = models.DateTimeField(auto_now_add=True)


class WatchedEpisode(models.Model):
    show = models.ForeignKey(FollowedShow, related_name='watched_episode', on_delete=models.CASCADE)
    has_seen = models.BooleanField(default=False)
    episode_id = models.IntegerField()
    url = models.URLField(max_length=400)
    name = models.TextField()
    season = models.IntegerField()
    number = models.IntegerField()
    air_time = models.TimeField()
    air_date = models.DateField()
    air_stamp = models.DateTimeField()
    summary = models.TextField()

    class Meta:
        ordering = ['season', 'number']
        unique_together = (('show', 'season', 'episode_id'),)
