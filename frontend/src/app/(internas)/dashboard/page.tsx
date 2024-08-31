'use client'

import { Tabs } from '@mantine/core';
import DespesaDashboard from './despesa/DespesaDashboard';

export default function Dashboard() {
  return (
    <Tabs color="teal" defaultValue="first" >
      <Tabs.List mb={'xl'}>
        <Tabs.Tab value="first">RECEITAS</Tabs.Tab>
        <Tabs.Tab value="second" color="blue">DESPESAS</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first" pt="xs">
       <DespesaDashboard/>
      </Tabs.Panel>

      <Tabs.Panel value="second" pt="xs">
       <DespesaDashboard/>
      </Tabs.Panel>
    </Tabs>
  );
}