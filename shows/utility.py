
import math
import re
from pytv import Shows, Show as TvShow
from pytv.tvmaze import ApiError, get_updates

from .models import Show

# keys that match the pattern are added by the library pytv excluding them
# allows **dict dump into Show model
default_pattern = r"_url|_list|id|type|next|_links"


def dict_data(show, pattern=default_pattern):
    """Filters the keys in vars(show) so it matches the model

    :param str pattern: regex pattern to filter un wanted keys
    :param show: pytv.tvmaze Show object
    :return: dict of class with un needed values filtered
    """
    return {k: v for k, v in vars(show).items() if not re.search(pattern, k)}


def save_show(show):
    """Save show to db"""
    return Show.objects.get_or_create(
        show_id=show.show_id,
        show_type=show.type,
        links=show._links,
        **dict_data(show)
    )


def save_shows(page=0):
    """Gets show data from api and stores it locally"""
    try:
        shows = Shows(page=page)
    except ApiError as e:
        raise e
    else:
        for show in shows.shows:
            save_show(show)
        else:
            save_shows(page + 1)


def resume_save_shows():
    """Start saving shows from the last page"""
    if Show.objects.count():
        # resume at last page
        page = int(math.floor(Show.objects.last().show_id / 250))
        save_shows(page)
    else:
        # start at page 0
        save_shows()


def sync_data():
    """Syncs api show data to local show data"""
    data = get_updates()
    for show_id, update_time, in data.items():
        try:
            show = Show.objects.get(show_id=show_id)
        except Show.DoesNotExist:
            # index missing show
            save_show(TvShow(show_id=show_id))
        else:
            if int(show.updated) != update_time:
                # compare values and update needed
                show_data = TvShow(show_id=show_id)
                if show_data.type != show.show_type:
                    show.show_type = show_data.type
                if show_data._links != show.links:
                    show.links = show_data._links
                for key in dict_data(TvShow(show_id=1)).keys():
                    if getattr(show_data, key) != getattr(show, key):
                        setattr(show, key, getattr(show_data, key))
                show.save()
