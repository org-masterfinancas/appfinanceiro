'use client'
import React from 'react';
import { Group, Text, Button, Divider } from '@mantine/core';
import { useRouter, usePathname } from 'next/navigation';

export default function PageHeader() {
  const phathname = usePathname()
  const getTitle = () => {
      switch (phathname) {
        case '/lancamentofinanceiro':
          return 'Lançamentos';
        case '/dashboard':
          return 'Dashboard';
        case '/alerta':
          return 'Alertas';
        case '/usuario':
          return 'Usuário';
        default:
          return 'Página';
      }
    };
  
    const titulo = getTitle();
  return (
    <div>
      <Group  align="center" mb="xl" justify='start'> 
        <Text size="xl" >
          {titulo}
        </Text>
      </Group>
      <Divider mb={'md'} />
    </div>
  );
}
