from .base import *

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# CORS liberado para o frontend em desenvolvimento
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',  # porta padrão do Vite
]