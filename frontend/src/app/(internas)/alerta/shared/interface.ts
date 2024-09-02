
export interface LinhasLancamentos {
    id: string
    descricaoLancamento: string
    dataCriacaoLancamento: Date
    valorLancamento: number
    qtdDias: number
}

export interface LancamentoTotalizado {
    quantidade: number
    totalValor: number
}