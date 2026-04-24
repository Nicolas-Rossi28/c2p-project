# C2P --- Sistema de Gestão de Clientes

Sistema web completo para cadastro e gestão de clientes, com
autenticação JWT, CRUD completo e dashboard com indicadores.

## Tecnologias

**Backend** - Python 3.13 + Django 6 + Django REST Framework -
PostgreSQL 16 - Autenticação JWT via `djangorestframework-simplejwt`

**Frontend** - React 19 + Vite - Tailwind CSS - Axios com interceptors
para JWT

**Infraestrutura** - Docker + Docker Compose

------------------------------------------------------------------------

## Rodando com Docker (recomendado)

### Pré-requisitos

-   Docker
-   Docker Compose

### Subindo o projeto

``` bash
git clone https://github.com/SEU-USUARIO/c2p-project.git
cd c2p-project
docker compose up --build
```

Aguarde todos os serviços subirem. O seed é executado automaticamente.

  Serviço    URL
  ---------- ----------------------------
  Frontend   http://localhost:5173
  Backend    http://localhost:8000
  API Docs   http://localhost:8000/api/

### Credenciais padrão

  Campo     Valor
  --------- ----------
  Usuário   admin
  Senha     admin123

------------------------------------------------------------------------

## Rodando localmente (sem Docker)

### Pré-requisitos

-   Python 3.11+
-   Node.js 20+
-   PostgreSQL rodando localmente

### Backend

``` bash
cd backend

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

cp .env.example .env

python manage.py migrate
python manage.py seed
python manage.py runserver
```

### Frontend

``` bash
cd frontend
npm install
npm run dev
```

------------------------------------------------------------------------

## Configuração do banco

### Variáveis de ambiente do backend (`.env`)

``` env
SECRET_KEY=sua-chave-secreta-aqui
DEBUG=True
DB_NAME=c2p_db
DB_USER=c2p_user
DB_PASSWORD=c2p_password
DB_HOST=localhost
DB_PORT=5432
```

### Criando o banco no PostgreSQL local

``` sql
CREATE DATABASE c2p_db;
CREATE USER c2p_user WITH PASSWORD 'c2p_password';
GRANT ALL PRIVILEGES ON DATABASE c2p_db TO c2p_user;
```

------------------------------------------------------------------------

## Autenticação

-   Login com JWT
-   Rotas protegidas no frontend
-   Refresh automático de token via Axios interceptors

------------------------------------------------------------------------

## Validações

-   Nome obrigatório
-   Email obrigatório e único
-   Telefone com validação básica
-   Cidade, estado, ativo e data_criacao tratados corretamente

------------------------------------------------------------------------

## Seed

O seed cria automaticamente: - 1 usuário administrador (`admin` /
`admin123`) - 20 clientes fictícios distribuídos por estados brasileiros

``` bash
docker compose exec backend python manage.py seed
python manage.py seed
```

O seed é idempotente.

------------------------------------------------------------------------

## Endpoints da API

### Autenticação

  Método   Endpoint             Descrição
  -------- -------------------- --------------------------
  POST     /api/auth/login/     Login --- retorna tokens
  POST     /api/auth/refresh/   Renova o access token

### Clientes

  Método   Endpoint                Descrição
  -------- ----------------------- ---------------------
  GET      /api/clientes/          Lista com paginação
  POST     /api/clientes/          Cria cliente
  GET      /api/clientes/{id}/     Detalha cliente
  PATCH    /api/clientes/{id}/     Edita cliente
  DELETE   /api/clientes/{id}/     Exclui cliente
  GET      /api/clientes/resumo/   Totais do dashboard

### Filtros disponíveis

GET /api/clientes/?search=ana\
GET /api/clientes/?estado=PR\
GET /api/clientes/?ativo=true\
GET /api/clientes/?page=2

------------------------------------------------------------------------

## Funcionalidades

-   Autenticação JWT com refresh token automático
-   Dashboard com totais
-   Listagem com paginação
-   Filtros por nome, email, cidade, estado e status
-   Criação e edição com validação
-   Exclusão com confirmação
-   Feedback visual
-   UI responsiva
-   Seed automatizado
