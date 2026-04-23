import { useState, useEffect, useCallback } from 'react'
import Layout from '../components/Layout'
import CardsResumo from '../components/CardsResumo'
import Filtros from '../components/Filtros'
import TabelaClientes from '../components/TabelaClientes'
import ModalCliente from '../components/ModalCliente'
import ModalConfirmacao from '../components/ModalConfirmacao'
import { clientesService } from '../services/clientes'

const FILTROS_INICIAIS = { search: '', estado: '', ativo: '', page: 1 }

export default function Dashboard() {
  const [clientes, setClientes] = useState([])
  const [resumo, setResumo] = useState(null)
  const [filtros, setFiltros] = useState(FILTROS_INICIAIS)
  const [paginacao, setPaginacao] = useState({ count: 0, next: null, previous: null, currentPage: 1 })
  const [carregandoClientes, setCarregandoClientes] = useState(true)
  const [carregandoResumo, setCarregandoResumo] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [excluindo, setExcluindo] = useState(false)
  const [modalAberto, setModalAberto] = useState(false)
  const [clienteEditando, setClienteEditando] = useState(null)
  const [clienteExcluindo, setClienteExcluindo] = useState(null)
  const [toast, setToast] = useState(null)

  const mostrarToast = useCallback((mensagem, tipo = 'sucesso') => {
    setToast({ mensagem, tipo })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const carregarClientes = useCallback(async () => {
    setCarregandoClientes(true)
    try {
      const response = await clientesService.listar(filtros)
      setClientes(response.data.results)
      setPaginacao({ count: response.data.count, next: response.data.next, previous: response.data.previous, currentPage: filtros.page })
    } catch {
      mostrarToast('Erro ao carregar clientes.', 'erro')
    } finally {
      setCarregandoClientes(false)
    }
  }, [filtros, mostrarToast])

  const carregarResumo = useCallback(async () => {
    setCarregandoResumo(true)
    try {
      const response = await clientesService.resumo()
      setResumo(response.data)
    } catch {
      // resumo é secundário — falha silenciosa
    } finally {
      setCarregandoResumo(false)
    }
  }, [])

  useEffect(() => { carregarClientes() }, [carregarClientes])
  useEffect(() => { carregarResumo() }, [carregarResumo])

  const handleSalvar = async (form) => {
    setSalvando(true)
    try {
      if (clienteEditando?.id) {
        await clientesService.atualizar(clienteEditando.id, form)
        mostrarToast('Cliente atualizado com sucesso!')
      } else {
        await clientesService.criar(form)
        mostrarToast('Cliente criado com sucesso!')
      }
      setModalAberto(false)
      setClienteEditando(null)
      carregarClientes()
      carregarResumo()
    } catch (error) {
      const msg = error.response?.data?.email?.[0] || error.response?.data?.detail || 'Erro ao salvar.'
      mostrarToast(msg, 'erro')
    } finally {
      setSalvando(false)
    }
  }

  const handleExcluir = async () => {
    setExcluindo(true)
    try {
      await clientesService.excluir(clienteExcluindo.id)
      mostrarToast('Cliente excluído com sucesso!')
      setClienteExcluindo(null)
      carregarClientes()
      carregarResumo()
    } catch {
      mostrarToast('Erro ao excluir.', 'erro')
    } finally {
      setExcluindo(false)
    }
  }

  return (
    <Layout>
      {/* Topbar — padding reduzido */}
      <div style={{ padding: '10px 24px', background: '#fff', borderBottom: '1px solid #ebebea', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 600, color: '#1c1c1a' }}>Clientes</div>
          <div style={{ fontSize: '16px', color: '#888780', marginTop: '1px' }}>Gerencie sua base de clientes</div>
        </div>
      </div>

      {/* Conteúdo — gap e padding menores */}
      <div style={{ flex: 1, padding: '12px 24px', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
        <CardsResumo resumo={resumo} carregando={carregandoResumo} />

        <div style={{ background: '#fff', border: '1px solid #ebebea', borderRadius: '10px', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <Filtros filtros={filtros} onChange={setFiltros} onNovo={() => { setClienteEditando(null); setModalAberto(true) }} />
          <TabelaClientes
            clientes={clientes}
            carregando={carregandoClientes}
            paginacao={paginacao}
            onPagina={(page) => setFiltros((f) => ({ ...f, page }))}
            onEditar={(c) => { setClienteEditando(c); setModalAberto(true) }}
            onExcluir={setClienteExcluindo}
          />
        </div>
      </div>

      {modalAberto && (
        <ModalCliente
          key={clienteEditando?.id ?? 'novo'}
          cliente={clienteEditando}
          onSalvar={handleSalvar}
          onFechar={() => { setModalAberto(false); setClienteEditando(null) }}
          salvando={salvando}
        />
      )}

      <ModalConfirmacao
        cliente={clienteExcluindo}
        onConfirmar={handleExcluir}
        onCancelar={() => setClienteExcluindo(null)}
        excluindo={excluindo}
      />

      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px',
          padding: '10px 16px', borderRadius: '8px',
          fontSize: '13px', fontWeight: 500, color: '#fff',
          background: toast.tipo === 'erro' ? '#a32d2d' : '#3b6d11',
          zIndex: 100,
        }}>
          {toast.mensagem}
        </div>
      )}
    </Layout>
  )
}