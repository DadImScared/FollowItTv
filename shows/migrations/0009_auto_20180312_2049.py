# Generated by Django 2.0.3 on 2018-03-13 00:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shows', '0008_auto_20180312_2013'),
    ]

    operations = [
        migrations.AlterField(
            model_name='show',
            name='officialSite',
            field=models.URLField(blank=True, max_length=400, null=True),
        ),
    ]
