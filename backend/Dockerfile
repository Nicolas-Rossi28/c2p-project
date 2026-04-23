# Imagem base oficial do Python
# "slim" significa versão menor, sem ferramentas desnecessárias
FROM python:3.13-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Variável de ambiente que evita que o Python crie arquivos .pyc
ENV PYTHONDONTWRITEBYTECODE=1
# Faz o Python não bufferizar o output — logs aparecem em tempo real
ENV PYTHONUNBUFFERED=1

# Instala dependências do sistema necessárias para o psycopg2
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copia primeiro só o requirements.txt
# Por que? Docker tem cache por camada — se o requirements não mudou,
# ele não reinstala tudo. Só copia o resto do código depois.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Agora copia o resto do código
COPY . .

# Porta que o Django vai escutar
EXPOSE 8000

# Comando padrão para iniciar o servidor
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]