from django.utils import timezone
from django.db.models import Count, Q
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Cliente
from .serializers import ClienteSerializer, ClienteResumoSerializer


class ClienteViewSet(viewsets.ModelViewSet):
    """
    ViewSet completo para CRUD de clientes.
    ModelViewSet já implementa: list, create, retrieve, update, destroy.
    """
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated]

    # Habilita busca e filtro automáticos
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nome', 'email', 'cidade']
    ordering_fields = ['nome', 'data_criacao', 'ativo']
    ordering = ['-data_criacao']

    def get_queryset(self):
        """
        Sobrescreve o queryset padrão para aplicar filtros opcionais
        passados como query params na URL.
        Ex: /api/clientes/?estado=PR&ativo=true
        """
        queryset = Cliente.objects.all()

        estado = self.request.query_params.get('estado')
        if estado:
            queryset = queryset.filter(estado=estado)

        ativo = self.request.query_params.get('ativo')
        if ativo is not None:
            # Converte string 'true'/'false' para boolean
            queryset = queryset.filter(ativo=ativo.lower() == 'true')

        return queryset

    @action(detail=False, methods=['get'], url_path='resumo')
    def resumo(self, request):
        """
        Endpoint customizado: GET /api/clientes/resumo/
        Retorna os totais para o dashboard.
        """
        hoje = timezone.now().date()

        total = Cliente.objects.count()
        ativos = Cliente.objects.filter(ativo=True).count()
        inativos = Cliente.objects.filter(ativo=False).count()
        cadastrados_hoje = Cliente.objects.filter(
            data_criacao__date=hoje
        ).count()

        # Agrupa clientes por estado com contagem
        por_estado = (
            Cliente.objects
            .values('estado')
            .annotate(total=Count('id'))
            .order_by('-total')
        )

        data = {
            'total': total,
            'ativos': ativos,
            'inativos': inativos,
            'cadastrados_hoje': cadastrados_hoje,
            'por_estado': list(por_estado),
        }

        serializer = ClienteResumoSerializer(data)
        return Response(serializer.data)