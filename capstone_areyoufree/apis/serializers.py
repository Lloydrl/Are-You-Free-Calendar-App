from rest_framework import serializers
from users.models import User
from events.models import Event
from django.contrib.auth import get_user_model

class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'username',)
        model = get_user_model()

class NestedEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'start_time',
            'end_time',
            'notes',
            'date',
        ]

class UserSerializer(serializers.ModelSerializer):
    event_details = NestedEventSerializer(many = True, source = 'events', read_only = True)
    class Meta:
        model = get_user_model()
        fields = [
            'id',
            'email',
            'username',
            'password',
            'first_name',
            'last_name',
            'date_of_birth',
            'event_details',
        ]

class EventSerializer(serializers.ModelSerializer):
    user_detail = NestedUserSerializer(many = True, source = 'event_auth', read_only = True)
    class Meta:
        model = Event
        fields = [
            'title',
            'start_time',
            'end_time',
            'notes',
            'event_auth',
            'user_detail',
            'date',
        ]
        