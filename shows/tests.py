
import inspect
from allauth.account.models import EmailAddress
from django.core import mail
from django.test import TestCase
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from rest_framework import status
import pytv
import factory
from pytv.tvmaze import ApiError

from .models import Show, FollowedShow, WatchedEpisode
from .utility import dict_data, save_shows, resume_save_shows, sync_data, save_show
from .email_users import mail_users, make_time
from . import factories

# Create your tests here.


def clean_up_factories():
    """Helper function to reset_sequence on object."""
    for name, obj in inspect.getmembers(factories):
        if inspect.isclass(obj) and "factory" in name.lower():
            obj.reset_sequence(0)


class TestUtility(TestCase):

    def compare_api_to_db(self, page=0):
        """Compare api page data to db"""
        shows = pytv.Shows(page).shows
        saved_shows = Show.objects.filter(show_id__gte=shows[0].show_id, show_id__lte=shows[-1].show_id)
        self.assertEqual(len(shows), saved_shows.count())
        for show1, show2 in zip(shows, saved_shows):
            self.assertEqual(show1.show_id, show2.show_id)
            self.assertEqual(show1.name, show2.name)
            self.assertEqual(show1.network, show2.network)

    def compare(self, start_page):
        """Compares several pages starting from start_page and ending at the last page"""
        compared = False
        count = 0
        while not compared:
            try:
                self.compare_api_to_db(start_page + count)
            except ApiError:
                compared = True
            count += 1

    def test_dict_data(self):
        show = pytv.Show(show_id=1)
        data = dict_data(show)
        created_show = Show.objects.create(
            show_id=show.show_id,
            show_type=show.type,
            links=show._links,
            **data
        )
        self.assertTrue(Show.objects.count())
        self.assertEqual(show.name, created_show.name)
        self.assertDictEqual(show.network, created_show.network)

    def test_save_shows(self):
        start_page = 130
        try:
            save_shows(start_page)
        except ApiError:
            # ApiError means last page so asserts go in the except
            self.compare(start_page)

    def test_resume_shows(self):
        all_shows = 0
        shows = pytv.Shows(page=135).shows
        all_shows += len(shows)
        for show in shows:
            Show.objects.get_or_create(
                show_id=show.show_id,
                show_type=show.type,
                links=show._links,
                **dict_data(show)
            )
        shows = pytv.Shows(page=136).shows
        all_shows += len(shows)
        for show in shows:
            Show.objects.get_or_create(
                show_id=show.show_id,
                show_type=show.type,
                links=show._links,
                **dict_data(show)
            )
        self.assertEqual(all_shows, Show.objects.count())
        try:
            resume_save_shows()
        except ApiError:
            self.compare(137)

    def test_full_save_shows(self):
        try:
            resume_save_shows()
        except ApiError:
            self.compare(0)

    def test_sync_data(self):
        show = pytv.Show(show_id=1)
        created_show = Show.objects.create(
            show_id=show.show_id,
            show_type=show.type,
            links=show._links,
            **dict_data(show)
        )
        created_show.show_type = 'other type'
        created_show.updated = 15151
        created_show.save()
        self.assertNotEqual(show.type, created_show.show_type)
        sync_data()
        created_show.refresh_from_db()
        self.assertEqual(show.type, created_show.show_type)

    def test_full_sync_data(self):
        try:
            save_shows(5)
        except ApiError:
            # for sanity and because this is a long test
            # print statements are placed at key points to signal the next stage
            print('start desync')
            for show in Show.objects.all():
                show.updated = 15250
                show.network = {'x': 'y'}
                show.weight = 2
                show.status = 'wrong status'
                show.url = 'www.google.com/fakeurl'
                show.save()
            for show in Show.objects.all():
                show_data = pytv.Show(show_id=show.show_id)
                self.assertNotEqual(show_data.network, show.network)
            print('start sync')
            sync_data()
            print('comparing')
            self.compare(0)

    def test_save_show(self):
        show = pytv.Show(show_id=1)
        self.assertFalse(Show.objects.count())
        save_show(show)
        self.assertTrue(Show.objects.count())
        show_instance = Show.objects.get(show_id=show.show_id)
        self.assertEqual(show.name, show_instance.name)


class BaseTestCase(APITestCase):
    """Base test case that all tests that use factories inherit from"""

    def setUp(self):
        self.users = factory.create_batch(factories.UserFactory, size=5)
        self.shows = factory.create_batch(factories.ShowFactory, size=25)

    def tearDown(self):
        clean_up_factories()

    def follow_shows(self, user, with_episodes=False):
        """Given a user object follow all shows in self.shows

        :param user: User object
        :param bool with_episodes: Should attach WatchedEpisode objects to each followed show
        :return:
        """
        followed = []
        for show in self.shows:
            followed.append(
                factories.FollowedShowFactory(
                    user=user,
                    show=show
                )
            )
        if with_episodes:
            self.add_episodes(followed)

    def add_episodes(self, followed):
        """Adds 10 episodes to each show in followed list"""
        for show in followed:
            for _ in range(10):
                factories.WatchedEpisodeFactory(
                    show=show
                )
            # after episodes are created for a show
            # reset episode sequence so future episodes start from 0
            factories.WatchedEpisodeFactory.reset_sequence()


class BaseAuthenticatedTest(BaseTestCase):
    """Base test where all authenticated tests inherit from"""

    def setUp(self):
        super().setUp()
        self.user = self.users[0]
        self.client.force_authenticate(user=self.user)

    def change_user(self):
        self.client.logout()
        self.user = self.users[1]
        self.client.force_authenticate(user=self.user)


class TestFollowShowView(BaseAuthenticatedTest):

    def test_user_follow_new_show(self):
        response = self.client.post(reverse('follow_show', args=(2,)))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, 'Following show')
        self.assertTrue(FollowedShow.objects.count())

    def test_user_un_follow_show(self):
        self.follow_shows(self.user)
        show = FollowedShow.objects.first()
        response = self.client.post(reverse('follow_show', args=(show.show.show_id,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'un followed show')
        show.refresh_from_db()
        self.assertFalse(show.is_following)

    def test_user_re_follows_show(self):
        self.follow_shows(self.user)
        show = FollowedShow.objects.first()
        show.is_following = False
        show.save()
        self.assertFalse(show.is_following)
        self.client.force_authenticate(user=self.user)
        response = self.client.post(reverse('follow_show', args=(show.show.show_id,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'following show')
        show.refresh_from_db()
        self.assertTrue(show.is_following)


class TestMailUsers(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.user = self.users[0]
        self.schedule = pytv.Schedule()
        self.shows = [episode.show for episode in self.schedule.episodes]
        EmailAddress.objects.create(user=self.user, email=self.user.email, primary=True, verified=True)

    def test_mail_users(self):
        show, created = save_show(self.shows[0])
        FollowedShow.objects.create(
            show=show,
            user=self.user
        )
        mail_users()
        self.assertTrue(len(mail.outbox))
        self.assertEqual(mail.outbox[0].body, '{} | {}'.format(show.name, make_time(show.schedule['time'])))

    def test_multiple_shows_mail_users(self):
        """a user following multiple shows should see results in reverse airtime"""
        for show in self.shows[::2]:
            show, created = save_show(show)
            FollowedShow.objects.create(
                show=show,
                user=self.user
            )

        mail_users()
        show_email = '{}'.format(
            '\n'.join(['{} | {}'.format(
                show.name,
                make_time(show.schedule['time'])
            ) for show in sorted(self.shows[::2], key=lambda item: item.schedule['time'], reverse=True)])
        )
        self.assertEqual(mail.outbox[0].body, show_email)
