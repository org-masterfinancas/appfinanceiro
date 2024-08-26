import { LancamentoFinanceiro } from "@/app/data/model/lancamentoFinanceiro";
import dayjs from "dayjs";

export function FiltrarLancamentoAtrasadoDespesas(lancamentos: LancamentoFinanceiro[]) {
    const hoje = new Date()
    const vinteDiasAtras = new Date(hoje)
    vinteDiasAtras.setDate(hoje.getDate() - 20)
    
    return lancamentos.filter(lancamento => {
        const dataLancamento = new Date(lancamento.dataCriacaoLancamento);
        return (
            lancamento.statusLancamento === "Pendente" &&  
            lancamento.tipoLancamento === "Despesa" &&
            dataLancamento < vinteDiasAtras
        )
    })
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