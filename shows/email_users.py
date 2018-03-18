
import datetime
from allauth.account.models import EmailAddress
from django.core import mail
from django.conf import settings
from pytv import Schedule

from .models import FollowedShow


def make_time(start_str):
    """Format 24 hour time str to 12 hour

    :param str start_str: Time str in the format of %H:%M
    :return: str of Time formatted as %I:%M%p
    """
    return datetime.datetime.strptime(start_str, '%H:%M').strftime('%I:%M%p')


def mail_users():
    """Gets TV schedule of today and emails each user with their followed shows that air today"""
    time = datetime.datetime.now()
    schedule = Schedule(date=time.strftime('%Y-%m-%d'))
    email_list = [item.email for item in EmailAddress.objects.filter(verified=True, primary=True)]
    episode_list = [episode.show.id for episode in schedule.episodes]
    shows = FollowedShow.objects.filter(
        show__show_id__in=episode_list,
        user__is_active=True,
        user__email__in=email_list
    )
    shows = sorted(shows, key=lambda followed_show: followed_show.show.schedule['time'], reverse=True)
    messages = {}
    for show in shows:
        if show.user.email in messages.keys():
            messages[show.user.email].append(show)
        else:
            messages[show.user.email] = [show]
    for email, show_list in messages.items():
        mail.send_mail(
            subject="Today's shows",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            message='{}'.format(
                "\n".join(['{} | {}'.format(
                    item.show.name,
                    make_time(item.show.schedule['time'])
                ) for item in show_list])
            )
        )


if __name__ == '__main__':
    mail_users()
