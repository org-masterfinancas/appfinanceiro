"use client";
import { LancamentoFinanceiro } from "../data/model/lancamentoFinanceiro";
import { formatDate } from "../Utils/utilsdata";
import LancamentoFinanceiroFormularioEntrada from "./LancamentoFinanceiroFormularioEntrada";
import LancamentoFinanceiroStatus from "./LancamentoFinanceiroStatus";
import LancamentoFinanceiroTipo from "./LancamentoFinanceiroTipo";

interface LancamentoFinanceiroFormularioProps {
  lancamento?: LancamentoFinanceiro;
  EhAlterado: boolean
  alternar?: () => void
  handleSalvar?: () => void
  mensagem?: any
  novoLancamento?: boolean

}

export default function LancamentoFinanceiroFormulario({ lancamento, EhAlterado, novoLancamento }: LancamentoFinanceiroFormularioProps) {
 
  const id = lancamento?.id?.split('-')[0]
  if (novoLancamento) {
    EhAlterado = true
  }

  return (
    <div className="flex flex-col border border-red-500 p-5" >
      <div className="flex flex-row gap-2">
        {novoLancamento ?
          false
          : (
            <>
              <LancamentoFinanceiroFormularioEntrada
                labelTexto="Id"
                tipo="text"
                nome="id"
                valor={id}
                somenteLeitura={true}
                className="flex flex-1"
              />
            </>
          )
        }
        <LancamentoFinanceiroFormularioEntrada
          labelTexto="Descrição"
          tipo="text"
          nome="descricaolancamento"
          valor={lancamento?.descricaoLancamento}
          somenteLeitura={!EhAlterado}
          className="flex flex-1"
        />
        <LancamentoFinanceiroStatus
          labelTexto="Status"
          nome="statuslancamento"
          valor={lancamento?.statusLancamento}
          somenteLeitura={!EhAlterado}
          className="flex flex-1"
        />

      </div>
      <div className="flex flex-row gap-2 mt-2">
        <LancamentoFinanceiroFormularioEntrada
          labelTexto="Data"
          tipo="date"
          nome="datalancamento"
          valor={formatDate(lancamento?.dataCriacaoLancamento)}
          somenteLeitura={!EhAlterado}
          className="flex flex-1"
        />

        <LancamentoFinanceiroFormularioEntrada
          labelTexto="Valor R$"
          tipo="number"
          nome="valorlancamento"
          valor={lancamento?.valorLancamento}
          somenteLeitura={!EhAlterado}
          place="1,00"
          className="flex flex-1"
        />
       
        <LancamentoFinanceiroTipo EhEditavel={EhAlterado} />
      </div>
    </div>
  )
}

/*
<SelectStatus value={status} onChange={handleStatusChange} />

 <label htmlFor="statuslancamento">Status</label>
        <input
          type="text"
          name="statuslancamento"
          readOnly={!EhAlterado}
          defaultValue={lancamento?.statusLancamento}
          className={`
            flex flex-1
            border border-orange-600 rounded-lg
            focus:outline-none bg-gray-100 px-4 py-2
            ${EhAlterado ? "" : "focus:bg-white"}
        `}
        />
*/