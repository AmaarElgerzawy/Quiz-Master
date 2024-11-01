# Generated by Django 5.1 on 2024-10-02 00:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0002_groupmodel_group_owner_alter_groupmodel_members'),
        ('quiz', '0013_alter_quiztaker_completed_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='group',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='quizzes', to='groups.groupmodel'),
        ),
    ]
