# Generated by Django 3.2.9 on 2021-11-14 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('firstname', models.TextField(default='none')),
                ('lastname', models.TextField(default='none')),
                ('email', models.TextField(default='none')),
                ('password', models.TextField(default='none')),
                ('token', models.TextField(default='none')),
            ],
        ),
    ]
