'use client';
import React from 'react';

interface LancamentoFinanceiroFiltroProps {
  labelTexto?: string;
  valor?: any;
  nome?: string;
  somenteLeitura?: boolean;
  className?: string;
  classNameLabel?: string;
  requerido?: boolean;
  valorMudou?: (valor: any) => void;
}

export default function LancamentoFinanceiroFiltro(props: LancamentoFinanceiroFiltroProps) {
  return (
    <div className={`flex flex-col ${props.className}`}>
      <label htmlFor={props.nome} className="text text-sm text-orange-500">{props.labelTexto}</label>
      <select
        defaultValue={props.valor}
        id={props.nome}
        name={props.nome}
        required={props.requerido}
        disabled={props.somenteLeitura}
        onChange={(e) => props.valorMudou?.(e.target.value)}
        className={`
          border border-orange-600 rounded-lg
          focus:outline-none bg-gray-100 px-1 py-1
          ${props.somenteLeitura ? "" : "focus:bg-green"}
        `}
      >
        <option value="Todos">Todos</option>
        <option value="Pendente">Pendente</option>
        <option value="Consolidado">Consolidado</option>
        <option value="Cancelado">Cancelado</option>
      </select>
    </div>
  )
}
