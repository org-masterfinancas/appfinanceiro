import { LancamentoFinanceiro } from "@/app/data/model/lancamentoFinanceiro";
import dayjs from "dayjs";

export function FiltrarLancamentoAtrasadoDespesas(lancamentos: LancamentoFinanceiro[]) {
    const hoje = new Date()
    const vinteDiasAtras = new Date(hoje)
    vinteDiasAtras.setDate(hoje.getDate() - 20)
    
    const lancamentoFiltrado = lancamentos.filter(lancamento => {
        const dataLancamento = new Date(lancamento.dataCriacaoLancamento);
        return (
            lancamento.statusLancamento === "Pendente" &&  
            lancamento.tipoLancamento === "Despesa" &&
            dataLancamento < vinteDiasAtras
        )
    })

    const dados = lancamentoFiltrado.map(lancamento => {
        const dataLancamento = new Date(lancamento.dataCriacaoLancamento);
        const qtdDias = Math.floor((hoje.getTime() - dataLancamento.getTime()) / (1000 * 60 * 60 * 24));
        
        return {
            id: lancamento.id,
            descricaoLancamento: lancamento.descricaoLancamento,
            valorLancamento: lancamento.valorLancamento,
            dataCriacaoLancamento: lancamento.dataCriacaoLancamento,
            qtdDias: qtdDias
        }
    })

    return dados
}

export function FiltrarLancamentoAtrasadoReceitas(lancamentos: LancamentoFinanceiro[]) {
    const hoje = new Date()
    const vinteDiasAtras = new Date(hoje)
    vinteDiasAtras.setDate(hoje.getDate() - 20)
    
    return lancamentos.filter(lancamento => {
        const dataLancamento = new Date(lancamento.dataCriacaoLancamento);
        return (
            lancamento.statusLancamento === "Pendente" &&  
            lancamento.tipoLancamento === "Receita" &&
            dataLancamento < vinteDiasAtras
        )
    })
}