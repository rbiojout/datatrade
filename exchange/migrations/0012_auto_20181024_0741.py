# Generated by Django 2.1.1 on 2018-10-24 07:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exchange', '0011_auto_20181023_1426'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tick',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
    ]