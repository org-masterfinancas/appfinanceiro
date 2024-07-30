
interface Usuario {
  nome: string;
}

export interface LancamentoFinanceiro {
  id?: string;
  descricaoLancamento: string;
  valorLancamento: number;
  tipoLancamento: string;
  statusLancamento: string;
  dataCriacaoLancamento: string;
  usuarioId: string;
  usuario?: Usuario;
}