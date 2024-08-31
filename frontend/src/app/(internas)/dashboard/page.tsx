'use client'

import { Loader, Tabs } from '@mantine/core';
import DespesaDashboard from './despesa/DespesaDashboard';
import useApi from '../hooks/useApi';
import { useEffect, useState } from 'react';
import { processarResumoMensalDespesa, ResumoMensal } from './despesa/resumo-despesa-mensal';
import { processarResumoStatusDespesa, ResumoStatus } from './despesa/resumo-despesa-status';
import { processarResumoMensalReceita } from './receita/resumo-receita-mensal';
import { processarResumoStatusReceita } from './receita/resumo-receita-status';
import ReceitaDashboard from './receita/ReceitaDashboard';

export default function Dashboard() {

  const { getApi } = useApi()
   const [ carregando, setCarregando ] = useState<boolean>(true)
   
   const [ dadoGraficoMensalDespesa, setDadoGraficoMensalDespesa] = useState<ResumoMensal[]>([])
   const [ dadoGraficoStatusDespesa, setDadoGraficoStatusDespesa] = useState<ResumoStatus[]>([])

   const [ dadoGraficoMensalReceita, setDadoGraficoMensalReceita] = useState<ResumoMensal[]>([])
   const [ dadoGraficoStatusReceita, setDadoGraficoStatusReceita] = useState<ResumoStatus[]>([])


   useEffect(() =>{
      async function obterLancamentos(){
         const dados = await getApi('/lancamentofinanceiros/')
         const resumoMensalDespesa = processarResumoMensalDespesa(dados)
         const resumoStatusDespesa = processarResumoStatusDespesa(dados)
         setDadoGraficoMensalDespesa(resumoMensalDespesa)
         setDadoGraficoStatusDespesa(resumoStatusDespesa)

         const resumoMensalReceita = processarResumoMensalReceita(dados)
         const resumoStatusReceita = processarResumoStatusReceita(dados)
         setDadoGraficoMensalReceita(resumoMensalReceita)
         setDadoGraficoStatusReceita(resumoStatusReceita)

         setCarregando(false)
      }
      obterLancamentos()
   }, [])

   if (carregando) return <Loader color="yellow" type="bars" />

  return (
    <Tabs color="teal" defaultValue="first" >
      <Tabs.List mb={'xl'}>
        <Tabs.Tab value="first">RECEITAS</Tabs.Tab>
        <Tabs.Tab value="second" color="dark">DESPESAS</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first" pt="xs">
       <ReceitaDashboard resumoMensal={dadoGraficoMensalReceita} resumoStatus={dadoGraficoStatusReceita}/>
      </Tabs.Panel>

      <Tabs.Panel value="second" pt="xs">
       <DespesaDashboard resumoMensal={dadoGraficoMensalDespesa} resumoStatus={dadoGraficoStatusDespesa}/>
      </Tabs.Panel>
    </Tabs>
  );
}