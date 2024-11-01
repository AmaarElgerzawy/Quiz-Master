# Generated by Django 5.1 on 2024-09-21 14:54

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0010_quiz_description'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='QuizTaker',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField(default=0, verbose_name='Score')),
                ('completed', models.BooleanField(default=False, verbose_name='Completed')),
                ('started_at', models.DateTimeField(auto_now_add=True)),
                ('completed_at', models.DateTimeField(blank=True, null=True)),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quiz_takers', to='quiz.quiz')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quiz_takers', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-completed_at'],
                'unique_together': {('user', 'quiz')},
            },
        ),
        migrations.AddField(
            model_name='quiz',
            name='taken_by',
            field=models.ManyToManyField(related_name='taken_quizzes', through='quiz.QuizTaker', to=settings.AUTH_USER_MODEL),
        ),
    ]
