import { Decimal } from "@prisma/client/runtime/library"
import Id from "../shared/Id"
import { StatusLancamento } from "./enum/StatusLancamento"
import { TipoLancamento } from "./enum/TipoLancamento"

export default class LancamentoFinanceiro {
    id: string 
    descricaoLancamento: string
    tipoLancamento: TipoLancamento
    valorLancamento: number
    statusLancamento: StatusLancamento
    dataCriacaoLancamento: Date


    constructor(
        descricaoLancamento: string,
        valorLancamento: number,
        tipoLancamento: TipoLancamento,
        statusLancamento: StatusLancamento,
        dataCriacaoLancamento: Date,
        id?: string,
                        ) {

            this.id = id? id : Id.novo() 
            this.descricaoLancamento = descricaoLancamento
            this.valorLancamento = valorLancamento
            this.tipoLancamento = tipoLancamento
            this.statusLancamento = statusLancamento 
            this.dataCriacaoLancamento = new Date(dataCriacaoLancamento)
    }
}

// Determina onde vai ficar a validação:  classe ou rota