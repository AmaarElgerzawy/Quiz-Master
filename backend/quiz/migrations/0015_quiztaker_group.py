# Generated by Django 5.1 on 2024-10-02 00:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0002_groupmodel_group_owner_alter_groupmodel_members'),
        ('quiz', '0014_quiz_group'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiztaker',
            name='group',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='quiz_takers', to='groups.groupmodel'),
        ),
    ]
