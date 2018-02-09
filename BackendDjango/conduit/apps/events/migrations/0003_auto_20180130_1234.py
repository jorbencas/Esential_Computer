# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_auto_20180130_1228'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='event',
            options={'ordering': ('type',)},
        ),
    ]
