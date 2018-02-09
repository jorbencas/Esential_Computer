# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='date',
            field=models.TextField(),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='event',
            name='description',
            field=models.TextField(),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='event',
            name='marca',
            field=models.TextField(),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='event',
            name='name',
            field=models.TextField(),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='event',
            name='picture',
            field=models.TextField(),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='event',
            name='price',
            field=models.TextField(),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='event',
            name='status',
            field=models.TextField(),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='event',
            name='type',
            field=models.TextField(),
            preserve_default=True,
        ),
    ]
