
interface Usuario {
  nome: string;
}

export interface LancamentoFinanceiro {
  id?: string;
  descricaoLancamento: string;
  valorLancamento: string;
  tipoLancamento: string;
  statusLancamento: string;
  dataCriacaoLancamento: string;
  usuarioId: string;
  usuario?: Usuario;
}