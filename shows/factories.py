
import factory
import datetime

import factory.fuzzy
from django.conf import settings

from .models import Show, FollowedShow, WatchedEpisode


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = settings.AUTH_USER_MODEL

    username = factory.Sequence(lambda n: 'user{}'.format(n))
    email = factory.Sequence(lambda n: 'user{}@email.com'.format(n))
    password = factory.PostGenerationMethodCall('set_password', 'password')
    is_active = True


class ShowFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Show

    name = factory.Sequence(lambda n: f'show{n}')
    show_id = factory.Sequence(lambda n: n)
    url = factory.Sequence(lambda n: f'www.showebsite{n}.com')
    status = 'Running'
    genres = factory.fuzzy.FuzzyChoice(
        choices=[
            ['Drama', 'Science-Fiction'],
            ['Thriller'],
            ['Action', 'Adventure']
        ]
    )
    schedule = factory.Dict({
        'time': factory.fuzzy.FuzzyChoice(choices=['12:00', '01:00', '03:00', '20:00']),
        'days': factory.fuzzy.FuzzyChoice(
            choices=[
                ['Monday', 'Tuesday'],
                ['Tuesday', 'Thursday'],
                ['Wednesday', 'Thursday']
            ]
        )
    })
    rating = {
        'average': 6.8
    }
    weight = 80
    updated = 1514029125


class FollowedShowFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = FollowedShow

    user = factory.SubFactory(UserFactory)
    show = factory.SubFactory(ShowFactory)


class WatchedEpisodeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = WatchedEpisode

    show = factory.SubFactory(FollowedShowFactory)
    episode_id = factory.Sequence(lambda n: n)
    url = factory.Sequence(lambda n: f'www.show.com/1/episodes/{n}')
    name = factory.Sequence(lambda n: f'episode{n}')
    season = 1
    number = factory.Sequence(lambda n: n)
    air_time = factory.fuzzy.FuzzyChoice(choices=['12:00', '02:00', '08:00', '22:00'])
    air_date = factory.fuzzy.FuzzyDate(start_date=datetime.date(2008, 1, 1))
    air_stamp = factory.fuzzy.FuzzyDateTime(start_dt=datetime.datetime(2008, 1, 1, tzinfo=datetime.timezone.utc))
