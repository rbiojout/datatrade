# Generated by Django 2.1.1 on 2018-10-22 15:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0011_auto_20181019_1503'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='company',
            options={'ordering': ['name'], 'verbose_name_plural': 'companies'},
        ),
        migrations.AlterModelOptions(
            name='industry',
            options={'ordering': ['name']},
        ),
        migrations.AlterModelOptions(
            name='sector',
            options={'ordering': ['name']},
        ),
    ]