from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField

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

    class Meta:
        ordering = ['show_id']
