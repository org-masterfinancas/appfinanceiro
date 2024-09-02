'use client'
import { Container, Stack } from "@mantine/core";
import GraficoReceitaMensal from "./GraficoReceitaMensal";
import GraficoReceitaStatus from "./GraficoReceitaStatus";
import { ResumoMensal, ResumoStatus } from "../shared/interface";

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