# Generated by Django 2.0.3 on 2018-03-13 00:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shows', '0006_auto_20180312_2006'),
    ]

    operations = [
        migrations.AlterField(
            model_name='show',
            name='runtime',
            field=models.IntegerField(null=True),
        ),
    ]
