import { LancamentoFinanceiro } from "@/app/data/model/lancamentoFinanceiro";
import { ResumoStatus } from "../shared/interface";

const statusColors: { [key: string]: string } = {
    Pendente: 'yellow.6',
    Consolidado: 'indigo.6',
    Cancelado: 'red.6'
};

export function processarResumoStatusReceita(lancamentos: LancamentoFinanceiro[]): ResumoStatus[] {

    const lancamentoReceita = lancamentos.filter((l => {
        return (
            l.tipoLancamento === 'Receita'
        )
       }))
    const acumulador: { [key: string]: number } = {
        Pendente: 0,
        Consolidado: 0,
        Cancelado: 0
    };

    lancamentoReceita.forEach(lancamento => {
        const status = lancamento.statusLancamento;
        if (acumulador.hasOwnProperty(status)) {
            acumulador[status] += 1;  
        }
    });

    const resumo: ResumoStatus[] = Object.keys(acumulador).map(status => ({
        name: status,
        value: acumulador[status], 
        color: statusColors[status]
    }));

    return resumo;
}
