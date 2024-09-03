'use client'
import React from 'react';
import { Group, Text, Button, Divider } from '@mantine/core';
import { usePathname } from 'next/navigation';

export default function CabecalhoPagina() {
  const phathname = usePathname()

  const obterTitulo = () => {
    switch (phathname) {
      case '/lancamento-financeiro':
        return 'Lançamentos'
      case '/dashboard':
        return 'Dashboard'
      case '/alerta':
        return 'Alertas'
      case '/usuario':
        return 'Usuário'
      default:
        return 'Página'
    }
  }

  const titulo = obterTitulo();
  return (
    <div>
      <Group align="center" mb="xl" justify='start'>
        <Text size="xl" >
          {titulo}
        </Text>
      </Group>
      <Divider mb={'md'} />
    </div>
  )
}
