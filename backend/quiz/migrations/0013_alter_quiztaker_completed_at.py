# Generated by Django 5.1 on 2024-09-30 19:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0012_alter_quiztaker_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quiztaker',
            name='completed_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
