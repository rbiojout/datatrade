# Generated by Django 2.1.1 on 2018-10-24 08:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exchange', '0012_auto_20181024_0741'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tick',
            name='volume',
            field=models.BigIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='tick',
            name='volume_adj',
            field=models.BigIntegerField(default=0, null=True),
        ),
    ]