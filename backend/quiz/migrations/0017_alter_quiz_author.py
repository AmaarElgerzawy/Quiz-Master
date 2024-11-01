# Generated by Django 5.1 on 2024-10-08 14:51

import quiz.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0016_alter_quiztaker_completed_at'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='quiz',
            name='author',
            field=models.ForeignKey(on_delete=quiz.models.get_system_admin, related_name='quizzes', to=settings.AUTH_USER_MODEL),
        ),
    ]
