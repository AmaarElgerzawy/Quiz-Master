# Generated by Django 5.1 on 2024-09-30 19:49

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='GroupModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_name', models.CharField(max_length=200, verbose_name='Group Name')),
                ('group_description', models.TextField(verbose_name='Group Description')),
                ('group_password', models.CharField(max_length=50, verbose_name='Group Password')),
                ('members', models.ManyToManyField(to=settings.AUTH_USER_MODEL, verbose_name='Members')),
            ],
        ),
    ]