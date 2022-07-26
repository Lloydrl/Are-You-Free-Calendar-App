from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=200)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    notes = models.TextField()

    def __str__(self):
        return self.title
