import { LancamentoFinanceiro } from "@/app/data/model/lancamentoFinanceiro";
import { mesesMap } from "../shared/util";
import { ResumoMensal } from "../shared/interface";

export function processarResumoMensalDespesa(lancamentos: LancamentoFinanceiro[]) {

   const lancamentoDespesa = lancamentos.filter((l => {
    return (
        l.tipoLancamento === 'Despesa'
    )
   }))

   const resumo = lancamentoDespesa.reduce<ResumoMensal[]>((acc, lancamento) => {
        const mes = new Date(lancamento.dataCriacaoLancamento).toLocaleString('pt-BR', { month: 'long' });
        const valor = +lancamento.valorLancamento

        let mesObj = acc.find(item => item.mes === mes);

        if (!mesObj) {
            mesObj = { mes, Consolidado: 0, Pendente: 0, Cancelado: 0 };
            acc.push(mesObj);
        }

        if (lancamento.statusLancamento === 'Consolidado') {
            mesObj.Consolidado += valor;
        } else if (lancamento.statusLancamento === 'Pendente') {
            mesObj.Pendente += valor;
        } else if (lancamento.statusLancamento === 'Cancelado') {
            mesObj.Cancelado += valor;
        }
        return acc;
    }, []);
    
    resumo.sort((a, b) => mesesMap[a.mes] - mesesMap[b.mes]);
    return resumo
}
