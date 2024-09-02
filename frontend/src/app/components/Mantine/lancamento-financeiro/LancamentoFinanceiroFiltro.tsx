'use client';
import React from 'react';
import { Select } from '@mantine/core';

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
      <Select

        data={[
          { value: 'Todos', label: 'Todos' },
          { value: 'Pendente', label: 'Pendente' },
          { value: 'Consolidado', label: 'Consolidado' },
          { value: 'Cancelado', label: 'Cancelado' },
        ]}
        value={props.valor}
        onChange={(value) => props.valorMudou?.(value)}
        disabled={props.somenteLeitura}
        classNames={{
          input: `${props.somenteLeitura ? '' : 'focus:bg-green'} bg-gray-100 border-orange-600`,
        }}
      />
   
  );
}
