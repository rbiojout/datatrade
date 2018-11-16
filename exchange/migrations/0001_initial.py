# Generated by Django 2.1.1 on 2018-11-16 18:04

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('company', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Exchange',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('time_zone', models.IntegerField(choices=[(-11, '(-11) Midway, Pago Pago'), (-10, '(-10) Honolulu'), (-9, '(-9) Anchorage'), (-8, '(-8) Los Angeles'), (-7, '(-7) Denver'), (-6, '(-6) Chicago'), (-5, '(-5) New York'), (-4, '(-4) Santiago'), (-3, '(-3) Rio de Janero'), (-2, '(-2) Fernando de Noronha'), (-1, '(-1) Praia'), (0, '(0) UTC London'), (1, '(1) Paris, Berlin'), (2, '(2) Athen'), (3, '(3) Djeddah'), (4, '(4) Dubai'), (5, '(5) Karachi'), (6, '(6) Dhaka'), (7, '(7) Bangkok, Jakarta'), (8, '(8) Hong-Kong, Nanjing'), (9, '(9) Tokyo'), (10, '(10) Sidney'), (11, '(11) Noumea'), (12, '(12) Welligton')], default=0, validators=[django.core.validators.MinValueValidator(-12), django.core.validators.MaxValueValidator(12)])),
                ('opening_time', models.DateTimeField(blank=True, null=True, verbose_name='local opening time')),
                ('closing_time', models.DateTimeField(blank=True, null=True, verbose_name='local closing time')),
            ],
        ),
        migrations.CreateModel(
            name='Provider',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('home_url', models.CharField(max_length=200)),
                ('api_url', models.CharField(blank=True, max_length=200)),
                ('comment', models.TextField(blank=True, null=True)),
                ('exchanges', models.ManyToManyField(to='exchange.Exchange')),
            ],
        ),
        migrations.CreateModel(
            name='Tick',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('date', models.DateField()),
                ('open', models.FloatField()),
                ('high', models.FloatField()),
                ('low', models.FloatField()),
                ('close', models.FloatField()),
                ('volume', models.BigIntegerField(default=0)),
                ('open_adj', models.FloatField(null=True)),
                ('high_adj', models.FloatField(null=True)),
                ('low_adj', models.FloatField(null=True)),
                ('close_adj', models.FloatField(null=True)),
                ('volume_adj', models.BigIntegerField(default=0, null=True)),
                ('dividend', models.FloatField(blank=True, null=True)),
                ('splits', models.FloatField(blank=True, null=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='company.Company')),
                ('provider', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='exchange.Provider')),
            ],
            options={
                'ordering': ['company', 'date', 'provider'],
            },
        ),
        migrations.CreateModel(
            name='Ticker',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('symbol', models.CharField(max_length=200, unique=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='ticker', to='company.Company')),
                ('exchange', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='exchange', to='exchange.Exchange')),
            ],
            options={
                'ordering': ['symbol'],
            },
        ),
        migrations.AlterUniqueTogether(
            name='tick',
            unique_together={('company', 'provider', 'date')},
        ),
    ]
