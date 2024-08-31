'use client'
import { Container, Stack } from "@mantine/core";
import { ResumoStatus } from "./resumo-receita-status";
import { ResumoMensal } from "./resumo-receita-mensal";
import GraficoReceitaMensal from "./GraficoReceitaMensal";
import GraficoReceitaStatus from "./GraficoReceitaStatus";

interface ReceitaDashboardProps{
   resumoMensal: ResumoMensal[]
   resumoStatus: ResumoStatus[]
}

export default function ReceitaDashboard({resumoMensal, resumoStatus}: ReceitaDashboardProps) {

   return (
      <Container>
         <Stack align="center">
            <GraficoReceitaMensal resumo={resumoMensal}/>
            <GraficoReceitaStatus resumo={resumoStatus}/>
         </Stack>
      </Container>
   )
}