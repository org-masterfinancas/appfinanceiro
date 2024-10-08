import { LancamentoFinanceiro } from "@/app/data/model/lancamentoFinanceiro";

export function filtrarLancamentoAtrasadoDespesas(lancamentos: LancamentoFinanceiro[]) {
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

    const despesaFiltrada = lancamentoFiltrado.map(lancamento => {
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
    
    const totalValor = despesaFiltrada.reduce((total, lancamento) => total + +lancamento.valorLancamento, 0);
    const quantidade = despesaFiltrada.length;

    return {
        despesaFiltrada,
        despesaTotalizada: {
            totalValor,
            quantidade,
        }
    }

}
