# Generated by Django 5.2.3 on 2025-06-11 03:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='billing_address',
        ),
    ]
