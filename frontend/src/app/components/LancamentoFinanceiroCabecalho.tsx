"use client";

interface LancamentoFinanceiroCabecalhoProps {
  EhAlterado: boolean;
  alternar: () => void;
  novoLancamento?: boolean
}

export default function LancamentoFinanceiroCabecalho({ EhAlterado, alternar, novoLancamento }: LancamentoFinanceiroCabecalhoProps) {
  return (
    <div>
      {novoLancamento ?
        <div className=" border border-green-500 mt-5">
          Modo: <span>Visualização</span>
        </div>
        :
        <div className="flex justify-between border border-green-500 mt-5">
          <div>
            Modo: {EhAlterado ? <span>Edição</span> : <span>Visualização</span>}
          </div>
          {!EhAlterado ? (
            <button className="bg-zinc-500 rounded-lg p-2" onClick={alternar}>Editar</button>
          ) : null}
        </div>
      }
    </div>
  )
}

