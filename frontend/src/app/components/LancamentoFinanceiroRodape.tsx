"use client";

interface LancamentoFinanceiroRodapeProps {
  EhAlterado: boolean;
  novoLancamento?:boolean
  handleCancelar: () => void
  handleExcluir?: () => void
}

export default function LancamentoFinanceiroRodape({ EhAlterado,novoLancamento, handleExcluir, handleCancelar }: LancamentoFinanceiroRodapeProps) {
  
  if(novoLancamento){
    EhAlterado = false
  }
  return (
    <div>
    {EhAlterado ? (
      <div className="flex gap-2  border border-red-500 p-5">
        <button type="submit" className="bg-green-500 rounded-lg p-2" >Salvar</button>
        <button type="button" className="bg-zinc-500 rounded-lg p-2" onClick={handleCancelar}>Cancelar</button>
        <button type="button" className="ml-auto bg-red-500 rounded-lg p-2" onClick={handleExcluir}>Excluir</button>
      </div>
    ):null}
     {novoLancamento ? (
      <div className="flex gap-2  p-5 border border-red-500">
        <button type="submit" className="bg-green-500 rounded-lg p-2" >Salvar</button>
        <button type="button" className="bg-zinc-500 rounded-lg p-2" onClick={handleCancelar}>Cancelar</button>
      </div>
    ):null}
  </div>
  )
}

