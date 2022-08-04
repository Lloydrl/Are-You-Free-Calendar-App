from django.db import models
from django.contrib.auth import get_user_model

class Event(models.Model):
    title = models.CharField(max_length=200)
    start_time = models.TimeField(auto_now = False, auto_now_add = False)
    end_time = models.TimeField(auto_now = False, auto_now_add = False)
    notes = models.TextField()
    event_auth = models.ManyToManyField(get_user_model(), related_name='events')
    date = models.DateField(blank = True, null = True)

    def __str__(self):
        return self.title
