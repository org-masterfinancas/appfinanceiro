'use client'
import { Container, Stack } from "@mantine/core";
import GraficoDespesaMensal from "./GraficoDespesaMensal";
import GraficoDespesaStatus from "./GraficoDespesaStatus";
import { ResumoMensal, ResumoStatus } from "../shared/interface";

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