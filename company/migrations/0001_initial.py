# Generated by Django 2.1.1 on 2018-11-18 16:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('symbol', models.CharField(max_length=10, null=True, unique=True)),
                ('website', models.CharField(blank=True, max_length=100, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('CEO', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'verbose_name_plural': 'companies',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Earning',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('actualEPS', models.FloatField(default=0.0, null=True)),
                ('consensusEPS', models.FloatField(default=0.0, null=True)),
                ('estimatedEPS', models.FloatField(default=0.0, null=True)),
                ('announceTime', models.IntegerField(choices=[(0, 'N/A'), (1, 'Before open'), (2, 'During trading'), (3, 'After close')], default=0)),
                ('numberOfEstimates', models.IntegerField(default=0, null=True)),
                ('EPSSurpriseDollar', models.FloatField(default=0.0, null=True)),
                ('EPSReportDate', models.DateField(blank=True, null=True)),
                ('fiscalEndDate', models.DateField(blank=True, null=True)),
                ('yearAgo', models.FloatField(default=0.0, null=True)),
                ('yearAgoChangePercent', models.FloatField(default=0.0, null=True)),
                ('estimatedChangePercent', models.FloatField(default=0.0, null=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='company.Company')),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_time', models.DateField(verbose_name='event time UTC')),
                ('category', models.IntegerField(choices=[(0, 'N/A'), (1, 'Split (new/old)'), (2, 'Dividend')], default=0)),
                ('value', models.FloatField()),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='company.Company')),
            ],
        ),
        migrations.CreateModel(
            name='FiscalPeriod',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Industry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Sector',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.AddField(
            model_name='earning',
            name='fiscalPeriod',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='company.FiscalPeriod'),
        ),
        migrations.AddField(
            model_name='company',
            name='industry',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='company.Industry'),
        ),
        migrations.AddField(
            model_name='company',
            name='sector',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='company.Sector'),
        ),
        migrations.AlterUniqueTogether(
            name='earning',
            unique_together={('company', 'fiscalPeriod')},
        ),
    ]
