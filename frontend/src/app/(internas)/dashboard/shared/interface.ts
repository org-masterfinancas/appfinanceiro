export interface ResumoMensal {
    mes: string;
    Consolidado: number;
    Pendente: number;
    Cancelado: number;
}

export interface ResumoStatus {
    name: string;
    value: number;
    color: string;
}