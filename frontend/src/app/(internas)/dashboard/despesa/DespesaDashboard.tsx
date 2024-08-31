'use client'
import { Container, Stack } from "@mantine/core";
import { ResumoStatus } from "./resumo-despesa-status";
import { ResumoMensal } from "./resumo-despesa-mensal";
import GraficoDespesaMensal from "./GraficoDespesaMensal";
import GraficoDespesaStatus from "./GraficoDespesaStatus";

interface DespesaDashboardProps{
   resumoMensal: ResumoMensal[]
   resumoStatus: ResumoStatus[]
}

export default function DespesaDashboard({resumoMensal, resumoStatus}: DespesaDashboardProps) {

   return (
      <Container>
         <Stack align="center">
            <GraficoDespesaMensal resumo={resumoMensal}/>
            <GraficoDespesaStatus resumo={resumoStatus}/>
         </Stack>
      </Container>
   )
}