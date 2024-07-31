'use client';
import React, { useState } from 'react';

interface LancamentoFinanceiroTipoProps {
  EhEditavel: boolean
  className?: string
}

export default function LancamentoFinanceiroTipo(props: LancamentoFinanceiroTipoProps) {

  const [tipo, setTipo] = useState<string>('Receita')

  const alternarTipo = () => {
    if (props.EhEditavel) {
      setTipo((prevTipo) => (prevTipo === 'Receita' ? 'Despesa' : 'Receita'));
    }
  }

  return (
    <div className={`flex flex-col ${props.className}`}>
      <label htmlFor="tipolancamento" className='mb-2' >Tipo</label>
      <input
        type="text"
        id="tipolancamento"
        name="tipolancamento"
        value={tipo}
        readOnly
        onClick={alternarTipo}
        className={`
          border border-orange-600 rounded-lg 
          focus:outline-none 
          ${tipo === "Despesa" ? "bg-red-200" : "bg-green-200" }
          px-4 py-2  
          ${props.EhEditavel ? "cursor-pointer" : ""}
            `}
      />
    </div>
  )
}


