# Generated by Django 2.1.1 on 2018-10-19 07:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('exchange', '0003_auto_20181018_1715'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ticker',
            old_name='name',
            new_name='symbol',
        ),
    ]