# Generated by Django 2.0.3 on 2018-03-13 00:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shows', '0009_auto_20180312_2049'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='show',
            options={'ordering': ['show_id']},
        ),
    ]
