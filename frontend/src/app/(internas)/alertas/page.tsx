'use client'
import { useEffect, useState } from 'react';
import {
    Table,
    Container,
    SimpleGrid,
    Box,
} from '@mantine/core';
import useApi from '@/app/(internas)/hooks/useApi';
import { formatarMoedaBR } from '@/app/Utils/Moeda';
import { FiltrarLancamentoAtrasadoDespesas } from '@/app/(internas)/alertas/despesaFiltrar';
import { FiltrarLancamentoAtrasadoReceitas } from './receitaFiltrar';
import DespesaPendente from './DespesaPendente';
import ReceitaPendente from './ReceitaPendente';

export interface LinhasLancamentos {
    id: string
    descricaoLancamento: string
    dataCriacaoLancamento: Date
    valorLancamento: number
    qtdDias: number
}

export interface LancamentoTotalizado {
    quantidade: number
    totalValor: number
}
    
    
export default function Alertas() {

    const { getApi } = useApi()

    const [despesa, SetDespesa] = useState<LinhasLancamentos[]>([])
    const [estatisticaDespesa, setEstatisticaDespesa] = useState<any>({})

    const [receita, SetReceita] = useState<LinhasLancamentos[]>([])
    const [estatisticaReceita, setEstatisticaReceita] = useState<any>({})

    useEffect(() => {
        async function obterLancamentos() {
            const dados = await getApi('/lancamentofinanceiros/')

            const resultadoDespesa = FiltrarLancamentoAtrasadoDespesas(dados)
            const { despesaFiltrada, despesaTotalizada } = resultadoDespesa
            setEstatisticaDespesa(despesaTotalizada)
            SetDespesa(despesaFiltrada)

            const resultadoReceita = FiltrarLancamentoAtrasadoReceitas(dados)
            const { receitaFiltrada, receitaTotalizada } = resultadoReceita
            setEstatisticaReceita(receitaTotalizada)
            SetReceita(receitaFiltrada)
        }
        obterLancamentos()
    }, [])

    const rowsDespesas = despesa.map((row) => (

        <Table.Tr key={row.id}>
            <Table.Td>{row.descricaoLancamento}</Table.Td>
            <Table.Td>{formatarMoedaBR(row.valorLancamento)}</Table.Td>
            <Table.Td>{row.qtdDias}</Table.Td>
        </Table.Tr>
    ))


    return (
        <Container size={'xl'}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={'sm'}>
                <Box>
                    <DespesaPendente linhasLancamentos={despesa} despesaTotalizada={estatisticaDespesa} />
                </Box>
                    <ReceitaPendente linhasLancamentos={receita} receitaTotalizada={estatisticaReceita} />
                <Box>
                </Box>
            </SimpleGrid>
        </Container>
    );
}