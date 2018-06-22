
To run the project follow the steps below

For server

At the root directory create a config.py file and fill it with the values

Email config

- EMAIL_USER
- EMAIL_PASS

Django config

- DEBUG
- SECRET_KEY

Postgres config

- PSG_USER
- PSG_PASS
- PSG_NAME
- PSG_HOST
- PSG_POR

Then run

- python manage.py makemigrations
- python manage.py migrate

Enter django shell

- python manage.py shell

In shell
```
from show.utility import resume_save_shows

resume_save_shows()
```

This will index all the shows from the tvmaze api and will take a while
you will know it's done when you see a 404 error in the console.

For client

- cd into client directory
- yarn
- npm start
