'use client'
import { Loader, Tabs } from '@mantine/core';
import useApi from '../hooks/useApi';
import { useEffect, useState } from 'react';
import ReceitaDashboard from './receita/ReceitaDashboard';
import DespesaDashboard from './despesa/DespesaDashboard';
import { ResumoMensal, ResumoStatus } from './shared/interface';
import { processarResumoMensalDespesa } from './despesa/resumo-despesa-mensal';
import { processarResumoMensalReceita } from './receita/resumo-receita-mensal';
import { processarResumoStatusDespesa } from './despesa/resumo-despesa-status';
import { processarResumoStatusReceita } from './receita/resumo-receita-status';
import CabecalhoPagina from '@/app/components/mantine/cabecalho-pagina/CabecalhoPagina';

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
    <>
    <CabecalhoPagina/>
    <Tabs color="teal" defaultValue="primeiro" >
      <Tabs.List mb={'xl'}>
        <Tabs.Tab value="primeiro">RECEITAS</Tabs.Tab>
        <Tabs.Tab value="segundo" color="dark">DESPESAS</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="primeiro" pt="xs">
       <ReceitaDashboard resumoMensal={dadoGraficoMensalReceita} resumoStatus={dadoGraficoStatusReceita}/>
      </Tabs.Panel>

      <Tabs.Panel value="segundo" pt="xs">
       <DespesaDashboard resumoMensal={dadoGraficoMensalDespesa} resumoStatus={dadoGraficoStatusDespesa}/>
      </Tabs.Panel>
    </Tabs>
    </>
  )
}