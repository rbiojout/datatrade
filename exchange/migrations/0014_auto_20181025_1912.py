# Generated by Django 2.1.1 on 2018-10-25 19:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('exchange', '0013_auto_20181024_0826'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='tickadjusted',
            unique_together=set(),
        ),
        migrations.RemoveField(
            model_name='tickadjusted',
            name='company',
        ),
        migrations.RemoveField(
            model_name='tickadjusted',
            name='provider',
        ),
        migrations.DeleteModel(
            name='TickAdjusted',
        ),
    ]
