
import math
import re
from pytv import Shows
from pytv.tvmaze import ApiError

from .models import Show

# keys that match the pattern are added by the library pytv excluding them
# allows **dict dump into Show model
pattern = r"_url|_list|id|type|next|_links"


def dict_data(show):
    """Filters the keys in vars(show) so it matches the model

    :param show: pytv.tvmaze Show object
    :return: dict of class with un needed values filtered
    """
    return {k: v for k, v in vars(show).items() if not re.search(pattern, k)}


def save_shows(page=0):
    """Gets show data from api and stores it locally"""
    try:
        shows = Shows(page=page)
    except ApiError as e:
        raise e
    else:
        for show in shows.shows:
            Show.objects.get_or_create(
                show_id=show.show_id,
                show_type=show.type,
                links=show._links,
                **dict_data(show)
            )
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
