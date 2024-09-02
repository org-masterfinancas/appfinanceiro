import { LancamentoFinanceiro } from "@/app/data/model/lancamentoFinanceiro";

export function filtrarLancamentoAtrasadoReceitas(lancamentos: LancamentoFinanceiro[]) {
    const hoje = new Date()
    const vinteDiasAtras = new Date(hoje)
    vinteDiasAtras.setDate(hoje.getDate() - 20)
    
    const lancamentoFiltrado = lancamentos.filter(lancamento => {
        const dataLancamento = new Date(lancamento.dataCriacaoLancamento);
        return (
            lancamento.statusLancamento === "Pendente" &&  
            lancamento.tipoLancamento === "Receita" &&
            dataLancamento < vinteDiasAtras
        )
    })

    const receitaFiltrada = lancamentoFiltrado.map(lancamento => {
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
    
    const totalValor = receitaFiltrada.reduce((total, lancamento) => total + +lancamento.valorLancamento, 0)
    const quantidade = receitaFiltrada.length

    return {
        receitaFiltrada,
        receitaTotalizada: {
            totalValor,
            quantidade,
        }
    }

}
