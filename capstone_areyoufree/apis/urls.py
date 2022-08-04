from django.urls import path
from .views import EventViewSet, UserViewSet, CurrentUserView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('events', EventViewSet, basename = 'events')
router.register('users', UserViewSet, basename = 'users')


urlpatterns = router.urls + [
    path('currentuser/', CurrentUserView.as_view()),
    
]