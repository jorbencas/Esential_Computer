from django.db import models


def parse_title(event):
    word_list = event.split()
    category = ''
    person = ''
    for i in word_list:
        if i.startswith('@'):
            person = i.strip('@')
        elif i.startswith('#'):
            category = i.strip('#')
    return category, person


class Event(models.Model):
    name = models.TextField()
    type = models.TextField()
    price = models.TextField()
    status = models.TextField()
    marca = models.TextField()
    date = models.TextField()
    picture = models.TextField()
    description = models.TextField()
    shop = models.TextField()

    class Meta:
        ordering = ('type',)

    def save(self, *args, **kwargs):
        #self.category = parse_title(self.title)[0]
        #self.person = parse_title(self.title)[1]
        super(Event, self).save(*args, **kwargs)

    def __str__(self):
        return "Event: {name}".format(name=self.name)
