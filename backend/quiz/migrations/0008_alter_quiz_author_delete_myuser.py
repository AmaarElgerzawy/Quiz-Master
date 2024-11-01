# Generated by Django 5.1 on 2024-09-13 14:42

import django.db.models.deletion
import quiz.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0007_alter_myuser_user'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='quiz',
            name='author',
            field=models.ForeignKey(default=quiz.models.get_system_admin, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='quizzes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='MyUser',
        ),
    ]
