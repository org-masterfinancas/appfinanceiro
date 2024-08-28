'use client'
import { Badge, Box, Card, Container, Group, Switch, Text } from '@mantine/core';
import classes from './SwitchesCard.module.css';
import useApi from '../hooks/useApi';
import { useEffect, useState } from 'react';
import { LancamentoFinanceiro } from '@/app/data/model/lancamentoFinanceiro';
import { FiltrarLancamentoAtrasadoDespesas, FiltrarLancamentoAtrasadoReceitas } from './dadosFiltrar';
import Link from 'next/link';
import dayjs from 'dayjs';

const data = [
    { title: 'Messages', description: 'Direct messages you have received from other users' },
    { title: 'Review requests', description: 'Code review requests from your team members' },
    { title: 'Comments', description: 'Daily digest with comments on your posts' },
    {
        title: 'Recommendations',
        description: 'Digest with best community posts from previous week',
    },
];

export default function SwitchesCard() {
    const { getApi } = useApi()
    const [carregando, setCarregando] = useState<boolean>(true)
    const [filtroVinteDiasAtrasoDespesa, setFiltroVinteDiasAtrasoDespesa] = useState<LancamentoFinanceiro[]>([])
    const [filtroVinteDiasAtrasoReceita, setFiltroVinteDiasAtrasoReceita] = useState<LancamentoFinanceiro[]>([])

    useEffect(() => {
        async function obterLancamentos() {
            const dados = await getApi('/lancamentofinanceiros/')
            const resultadoDespesas = FiltrarLancamentoAtrasadoDespesas(dados)
            const resultadoReceitas = FiltrarLancamentoAtrasadoReceitas(dados)
            setFiltroVinteDiasAtrasoDespesa(resultadoDespesas)
            setFiltroVinteDiasAtrasoReceita(resultadoReceitas)
        }
        obterLancamentos()
    }, [])

    const items = filtroVinteDiasAtrasoReceita.map((item) => (
        <Group justify="space-between" className={classes.item} wrap="nowrap" gap="xl" key={item.id}>
            <div>
                <Text>{item.descricaoLancamento}</Text>
                <Text size="xs" c="dimmed">
                    {`${dayjs(item.dataCriacaoLancamento).format('YYYY-MM-DD')}`}
                </Text>
                <Text>
                    {`R$ ${item.valorLancamento}`}
                </Text>
            </div>
            <Badge component={Link} href={`/lancamentofinanceiros/registro/${item.id}`} >Vizualizar</Badge>
        </Group>
    ));

    return (
        <Group justify='center'>
            <Card withBorder radius="md" p="xl" className={classes.card}>
                <Text fz="h3" className={classes.title} fw={500}>
                    Receita Pendente
                </Text>
                <Text fz="h4" c="red.5" mt={3} mb="xl">
                    20 dias de Atraso
                </Text>
                {items}
            </Card>
            <Card withBorder radius="md" p="xl" className={classes.card}>
                <Text fz="h3" className={classes.title} fw={500}>
                    Despesa Pendente
                </Text>
                <Text fz="h4" c="yellow.7" mt={3} mb="xl">
                    20 dias de Atraso
                </Text>
                {items}
            </Card>
        </Group >
    );
}