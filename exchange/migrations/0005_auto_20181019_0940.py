# Generated by Django 2.1.1 on 2018-10-19 09:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exchange', '0004_auto_20181019_0733'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exchange',
            name='closing_time',
            field=models.DateTimeField(blank=True, null=True, verbose_name='local closing time'),
        ),
        migrations.AlterField(
            model_name='exchange',
            name='opening_time',
            field=models.DateTimeField(blank=True, null=True, verbose_name='local opening time'),
        ),
    ]
