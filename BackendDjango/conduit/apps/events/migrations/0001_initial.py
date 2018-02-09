# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=200)),
                ('type', models.TextField(max_length=200)),
                ('price', models.TextField(max_length=200)),
                ('status', models.TextField(max_length=200)),
                ('marca', models.TextField(max_length=200)),
                ('date', models.TextField(max_length=200)),
                ('picture', models.TextField(max_length=200)),
                ('description', models.TextField(max_length=200)),
                ('descriptions', models.TextField(max_length=200)),
            ],
            options={
                'ordering': ('type',),
            },
            bases=(models.Model,),
        ),
    ]
