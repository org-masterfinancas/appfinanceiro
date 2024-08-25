'use client'
import { Container, Stack } from "@mantine/core";
import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";
import { LancamentoFinanceiro } from "@/app/data/model/lancamentoFinanceiro";

import PageDonutChart from "./PageDonutChart";
import PageBarChart from "./PageBarChart";

import { DataDonuChart, ResumoStatus } from "./dataDonuChart";
import { DataBarChart, ResumoMensal } from "./dataBarChart";

export default function Page() {

   const { getApi } = useApi()
   const [ carregando, setCarregando ] = useState<boolean>(true)
   const [ lancamentos, setLancamentos] = useState<LancamentoFinanceiro[]>([])
   const [ dataBarChart, setDataBarChart] = useState<ResumoMensal[]>([])
   const [ dataDonuChart, setdataDonuChart] = useState<ResumoStatus[]>([])

   useEffect(() =>{
      async function obterLancamentos(){
         const dados = await getApi('/lancamentofinanceiros/')
         const resumoMensal = DataBarChart(dados)
         const resumoStatus = DataDonuChart(dados)
         setLancamentos(dados)
         setDataBarChart(resumoMensal)
         setdataDonuChart(resumoStatus)
      }
      obterLancamentos()
   }, [])

   return (
      <Container>
         <Stack align="center">
            <PageBarChart resumo={dataBarChart}/>
            <PageDonutChart resumo={dataDonuChart}/>
         </Stack>
      </Container>
   )
}