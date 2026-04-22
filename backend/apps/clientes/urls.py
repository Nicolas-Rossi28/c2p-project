from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClienteViewSet

# O Router gera automaticamente todas as URLs do ViewSet
router = DefaultRouter()
router.register(r'clientes', ClienteViewSet, basename='cliente')

urlpatterns = [
    path('', include(router.urls)),
]