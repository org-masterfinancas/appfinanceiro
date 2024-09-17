import { ControllerErro, ModelErro, ServiceErro } from "@src/shared/erro"
import HttpStatusCodes from "@src/shared/http-status-code"
import validator from "validator"
import { TipoLancamento } from "./enum/tipo-lancamento"
import { StatusLancamento } from "./enum/status-lancamento"
import dayjs from "dayjs"

export interface ILancamentoFinanceiro {
  id: string
  descricaoLancamento: string
  tipoLancamento: string
  valorLancamento: number
  statusLancamento: string
  dataCriacaoLancamento: Date
}

function isLancamentoFinanceiro(arg: unknown): arg is ILancamentoFinanceiro {
  if (typeof arg !== 'object' || arg === null) {
    throw new ModelErro('O Lançamento Financeiro deve ser informado')
  }

  const obj = arg as ILancamentoFinanceiro

  if (!obj.descricaoLancamento && obj.valorLancamento == undefined && !obj.statusLancamento && !obj.tipoLancamento && !obj.dataCriacaoLancamento) {
    throw new ModelErro('O Lançamento Financeiro incompleto');
  }

  if (typeof obj.descricaoLancamento !== 'string') {
    throw new ModelErro('Descrição inválida')
  }

  if (obj.descricaoLancamento.trim().length < 3) {
    throw new ModelErro('Descrição curta')
  }

  if (obj.valorLancamento === undefined || typeof obj.valorLancamento !== 'number') {
    throw new ModelErro('O Valor do Lançamento deve ser informado e deve ser um número')
  }

  if (obj.valorLancamento <= 0.0) {
    throw new ModelErro('O Valor do Lançamento informado está inválido')
  }
  obj.valorLancamento = Math.trunc(obj.valorLancamento * 100) / 100;

  if (obj.tipoLancamento.trim().toLocaleLowerCase() !== 'despesa' && obj.tipoLancamento.trim().toLocaleLowerCase() !== 'receita') {
    throw new ModelErro('O Tipo do Lançamento informado está inválido')
  }

  const statusLancamento = Object.values(StatusLancamento);
  const status = obj.statusLancamento.trim().toLowerCase()
  if (!validator.isIn(status, statusLancamento)) {
    throw new ModelErro('O Status do Lançamento informado está inválido');
  }

  if (!dayjs(obj.dataCriacaoLancamento).isValid()) {
    throw new ModelErro('A Data do Lançamento informada está inválida');
}

 obj.dataCriacaoLancamento = new Date(obj.dataCriacaoLancamento)

  return true
}

export default {
  isLancamentoFinanceiro,
}