import random
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from apps.clientes.models import Cliente


class Command(BaseCommand):
    
    help = 'Popula o banco com dados iniciais para desenvolvimento'

    def handle(self, *args, **kwargs):
        self.stdout.write('Iniciando seed do banco de dados...')

        self._criar_usuario_admin()
        self._criar_clientes()

        self.stdout.write(self.style.SUCCESS('Seed concluído com sucesso!'))

    def _criar_usuario_admin(self):
        """Cria o usuário padrão para login se não existir."""
        if User.objects.filter(username='admin').exists():
            self.stdout.write('Usuário admin já existe, pulando...')
            return

        User.objects.create_superuser(
            username='admin',
            email='admin@c2p.com',
            password='admin123',
        )
        self.stdout.write('Usuário admin criado (senha: admin123)')

    def _criar_clientes(self):
        """Cria clientes fictícios para popular a listagem."""

        clientes_data = [
            {
                'nome': 'Ana Paula Ferreira',
                'email': 'ana.ferreira@email.com',
                'telefone': '(41) 99876-5432',
                'cidade': 'Curitiba',
                'estado': 'PR',
                'ativo': True,
            },
            {
                'nome': 'Bruno Mendes Silva',
                'email': 'bruno.mendes@email.com',
                'telefone': '(11) 98765-4321',
                'cidade': 'São Paulo',
                'estado': 'SP',
                'ativo': True,
            },
            {
                'nome': 'Carla Rodrigues',
                'email': 'carla.rodrigues@email.com',
                'telefone': '(21) 97654-3210',
                'cidade': 'Rio de Janeiro',
                'estado': 'RJ',
                'ativo': False,
            },
            {
                'nome': 'Diego Alves Costa',
                'email': 'diego.alves@email.com',
                'telefone': '(51) 96543-2109',
                'cidade': 'Porto Alegre',
                'estado': 'RS',
                'ativo': True,
            },
            {
                'nome': 'Eduarda Lima Santos',
                'email': 'eduarda.lima@email.com',
                'telefone': '(31) 95432-1098',
                'cidade': 'Belo Horizonte',
                'estado': 'MG',
                'ativo': True,
            },
            {
                'nome': 'Felipe Nascimento',
                'email': 'felipe.nascimento@email.com',
                'telefone': '(71) 94321-0987',
                'cidade': 'Salvador',
                'estado': 'BA',
                'ativo': False,
            },
            {
                'nome': 'Gabriela Oliveira',
                'email': 'gabriela.oliveira@email.com',
                'telefone': '(85) 93210-9876',
                'cidade': 'Fortaleza',
                'estado': 'CE',
                'ativo': True,
            },
            {
                'nome': 'Henrique Souza',
                'email': 'henrique.souza@email.com',
                'telefone': '(92) 92109-8765',
                'cidade': 'Manaus',
                'estado': 'AM',
                'ativo': True,
            },
            {
                'nome': 'Isabela Castro Pereira',
                'email': 'isabela.castro@email.com',
                'telefone': '(62) 91098-7654',
                'cidade': 'Goiânia',
                'estado': 'GO',
                'ativo': False,
            },
            {
                'nome': 'João Victor Martins',
                'email': 'joao.martins@email.com',
                'telefone': '(81) 90987-6543',
                'cidade': 'Recife',
                'estado': 'PE',
                'ativo': True,
            },
            {
                'nome': 'Kamila Barbosa',
                'email': 'kamila.barbosa@email.com',
                'telefone': '(48) 99876-1234',
                'cidade': 'Florianópolis',
                'estado': 'SC',
                'ativo': True,
            },
            {
                'nome': 'Lucas Teixeira',
                'email': 'lucas.teixeira@email.com',
                'telefone': '(27) 98765-2345',
                'cidade': 'Vitória',
                'estado': 'ES',
                'ativo': True,
            },
            {
                'nome': 'Mariana Gomes',
                'email': 'mariana.gomes@email.com',
                'telefone': '(83) 97654-3456',
                'cidade': 'João Pessoa',
                'estado': 'PB',
                'ativo': False,
            },
            {
                'nome': 'Nathan Ribeiro',
                'email': 'nathan.ribeiro@email.com',
                'telefone': '(91) 96543-4567',
                'cidade': 'Belém',
                'estado': 'PA',
                'ativo': True,
            },
            {
                'nome': 'Olivia Campos',
                'email': 'olivia.campos@email.com',
                'telefone': '(67) 95432-5678',
                'cidade': 'Campo Grande',
                'estado': 'MS',
                'ativo': True,
            },
            {
                'nome': 'Paulo Henrique Dias',
                'email': 'paulo.dias@email.com',
                'telefone': '(65) 94321-6789',
                'cidade': 'Cuiabá',
                'estado': 'MT',
                'ativo': False,
            },
            {
                'nome': 'Rafaela Moreira',
                'email': 'rafaela.moreira@email.com',
                'telefone': '(95) 93210-7890',
                'cidade': 'Boa Vista',
                'estado': 'RR',
                'ativo': True,
            },
            {
                'nome': 'Samuel Carvalho',
                'email': 'samuel.carvalho@email.com',
                'telefone': '(61) 92109-8901',
                'cidade': 'Brasília',
                'estado': 'DF',
                'ativo': True,
            },
            {
                'nome': 'Tatiane Freitas',
                'email': 'tatiane.freitas@email.com',
                'telefone': '(98) 91098-9012',
                'cidade': 'São Luís',
                'estado': 'MA',
                'ativo': True,
            },
            {
                'nome': 'Victor Hugo Araújo',
                'email': 'victor.araujo@email.com',
                'telefone': '(86) 90987-0123',
                'cidade': 'Teresina',
                'estado': 'PI',
                'ativo': False,
            },
        ]

        criados = 0
        for data in clientes_data:
            
            cliente, created = Cliente.objects.get_or_create(
                email=data['email'],
                defaults=data
            )
            if created:
                criados += 1

        self.stdout.write(f'{criados} clientes criados')