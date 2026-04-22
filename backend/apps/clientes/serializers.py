import re
from rest_framework import serializers
from .models import Cliente


class ClienteSerializer(serializers.ModelSerializer):
    # Campo extra apenas para leitura — mostra o nome do estado por extenso
    estado_display = serializers.CharField(
        source='get_estado_display',
        read_only=True
    )

    class Meta:
        model = Cliente
        fields = [
            'id',
            'nome',
            'email',
            'telefone',
            'cidade',
            'estado',
            'estado_display',
            'ativo',
            'data_criacao',
            'data_atualizacao',
        ]
        # Esses campos são gerados automaticamente — o cliente não envia
        read_only_fields = ['id', 'data_criacao', 'data_atualizacao']

    def validate_nome(self, value):
        """Nome não pode ser vazio ou só espaços."""
        if not value.strip():
            raise serializers.ValidationError('O nome não pode ser vazio.')
        return value.strip()

    def validate_telefone(self, value):
        """
        Valida formato básico de telefone brasileiro.
        Aceita: (41) 99999-9999 ou 41999999999 ou variações.
        """
        # Remove tudo que não é número
        numeros = re.sub(r'\D', '', value)

        if len(numeros) < 10 or len(numeros) > 11:
            raise serializers.ValidationError(
                'Telefone inválido. Use o formato (XX) XXXXX-XXXX.'
            )
        return value

    def validate_email(self, value):
        """
        Garante que o email é único — mas ignora o próprio registro
        em caso de edição (update).
        """
        # self.instance existe quando é um UPDATE, não em CREATE
        qs = Cliente.objects.filter(email=value)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError(
                'Já existe um cliente com este email.'
            )
        return value.lower()  # sempre salva em minúsculo


class ClienteResumoSerializer(serializers.Serializer):
    """
    Serializer simples para os totais do dashboard.
    Não está ligado a um Model — apenas estrutura os dados.
    """
    total = serializers.IntegerField()
    ativos = serializers.IntegerField()
    inativos = serializers.IntegerField()
    cadastrados_hoje = serializers.IntegerField()
    por_estado = serializers.ListField()