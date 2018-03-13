
from django.test import TestCase
import pytv
from pytv.tvmaze import ApiError

from .models import Show
from .utility import dict_data, save_shows, resume_save_shows

# Create your tests here.


class TestUtility(TestCase):

    def compare_api_to_db(self, page=0):
        """Compare api page data to db"""
        shows = pytv.Shows(page).shows
        saved_shows = Show.objects.filter(show_id__gte=shows[0].show_id, show_id__lte=shows[-1].show_id)
        self.assertEqual(len(shows), saved_shows.count())
        for show1, show2 in zip(shows, saved_shows):
            self.assertEqual(show1.show_id, show2.show_id)

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
