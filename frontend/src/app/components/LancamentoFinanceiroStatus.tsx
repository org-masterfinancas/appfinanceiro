'use client';
import React from 'react';

interface LancamentoFinanceiroStatusProps {
  labelTexto?: string;
  valor?: any;
  nome?: string;
  somenteLeitura?: boolean;
  className?: string;
  requerido?: boolean
  valorMudou?: (valor: any) => void;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}


export default function LancamentoFinanceiroStatus(props: LancamentoFinanceiroStatusProps) {
  return (
    <div className={`flex flex-col ${props.className}`}>
      <label htmlFor={props.nome} className='mb-2'>{props.labelTexto}</label>
      <select
        defaultValue={props?.valor}
        id={props.nome}
        name={props.nome}
        required
        disabled={props.somenteLeitura}
        onChange={(e) => props.valorMudou?.(e.target.value)}
        className={`
        border border-orange-600 rounded-lg
        focus:outline-none bg-gray-100 px-4 py-2
        ${props.somenteLeitura ? "" : "focus:bg-green"}
        `}
      >
        <option value="Pendente">Pendente</option>
        <option value="Consolidado">Consolidado</option>
        <option value="Cancelado">Cancelado</option>
      </select>
    </div>
  )
}


