# Generated by Django 2.1.1 on 2018-10-18 17:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('exchange', '0002_auto_20181018_1636'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticker',
            name='company',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='ticker', to='company.Company'),
        ),
        migrations.AlterField(
            model_name='ticker',
            name='exchange',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='exchange', to='exchange.Exchange'),
        ),
    ]
