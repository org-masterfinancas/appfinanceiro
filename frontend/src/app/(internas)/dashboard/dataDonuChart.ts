import { LancamentoFinanceiro } from "@/app/data/model/lancamentoFinanceiro";

export interface ResumoStatus {
    name: string;
    value: number;
    color: string;
}

const statusColors: { [key: string]: string } = {
    Pendente: 'yellow.6',
    Consolidado: 'indigo.6',
    Cancelado: 'red.6'
};

export function DataDonuChart(lancamentos: LancamentoFinanceiro[]): ResumoStatus[] {

    const acumulador: { [key: string]: number } = {
        Pendente: 0,
        Consolidado: 0,
        Cancelado: 0
    };

    lancamentos.forEach(lancamento => {
        const valor = +lancamento.valorLancamento;
        const status = lancamento.statusLancamento;
        if (acumulador.hasOwnProperty(status)) {
            acumulador[status] += valor;
        }
    });

    const resumo: ResumoStatus[] = Object.keys(acumulador).map(status => ({
        name: status,
        value: acumulador[status],
        color: statusColors[status]
    }));

    return resumo;
}
