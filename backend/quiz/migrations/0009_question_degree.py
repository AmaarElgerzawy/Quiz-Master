# Generated by Django 5.1 on 2024-09-18 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0008_alter_quiz_author_delete_myuser'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='degree',
            field=models.IntegerField(default=1, verbose_name='Degree'),
        ),
    ]