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

  // useCallback evita recriar a função a cada render
  // Isso é importante porque ela é usada como dependência no useEffect
  const carregarClientes = useCallback(async () => {
    setCarregandoClientes(true)
    try {
      const response = await clientesService.listar(filtros)
      setClientes(response.data.results)
      setPaginacao({
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
        currentPage: filtros.page,
      })
    } catch {
      mostrarToast('Erro ao carregar clientes.', 'erro')
    } finally {
      setCarregandoClientes(false)
    }
  }, [filtros])

  const carregarResumo = async () => {
    setCarregandoResumo(true)
    try {
      const response = await clientesService.resumo()
      setResumo(response.data)
    } catch {
      // Silencioso — o resumo é secundário
    } finally {
      setCarregandoResumo(false)
    }
  }

  // Recarrega clientes sempre que os filtros mudam
  useEffect(() => {
    carregarClientes()
  }, [carregarClientes])

  // Resumo carrega só uma vez na montagem
  useEffect(() => {
    carregarResumo()
  }, [])

  const mostrarToast = (mensagem, tipo = 'sucesso') => {
    setToast({ mensagem, tipo })
    setTimeout(() => setToast(null), 3000)
  }

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
      const msg = error.response?.data?.email?.[0]
        || error.response?.data?.detail
        || 'Erro ao salvar cliente.'
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
      mostrarToast('Erro ao excluir cliente.', 'erro')
    } finally {
      setExcluindo(false)
    }
  }

  return (
    <Layout>
      <CardsResumo resumo={resumo} carregando={carregandoResumo} />

      <Filtros
        filtros={filtros}
        onChange={setFiltros}
        onNovo={() => {
          setClienteEditando(null)
          setModalAberto(true)
        }}
      />

      <TabelaClientes
        clientes={clientes}
        carregando={carregandoClientes}
        paginacao={paginacao}
        onPagina={(page) => setFiltros((f) => ({ ...f, page }))}
        onEditar={(cliente) => {
          setClienteEditando(cliente)
          setModalAberto(true)
        }}
        onExcluir={setClienteExcluindo}
      />

      {modalAberto && (
        <ModalCliente
        key={clienteEditando?.id ?? 'novo'}
        cliente={clienteEditando}
        onSalvar={handleSalvar}
        onFechar={() => {
          setModalAberto(false)
          setClienteEditando(null)
        }}
        salvando={salvando}
      />
    )}

      <ModalConfirmacao
        cliente={clienteExcluindo}
        onConfirmar={handleExcluir}
        onCancelar={() => setClienteExcluindo(null)}
        excluindo={excluindo}
      />

      {/* Toast de feedback */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all z-50 ${
          toast.tipo === 'erro' ? 'bg-red-600' : 'bg-green-600'
        }`}>
          {toast.mensagem}
        </div>
      )}
    </Layout>
  )
}