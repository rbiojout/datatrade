# Generated by Django 2.1.1 on 2018-10-23 14:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('exchange', '0010_auto_20181023_1414'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tick',
            old_name='split',
            new_name='splits',
        ),
    ]
