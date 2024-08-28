'use client'
import React, { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import { LancamentoFinanceiro } from '@/app/data/model/lancamentoFinanceiro';
import { FiltrarLancamentoAtrasadoDespesas, FiltrarLancamentoAtrasadoReceitas } from './dadosFiltrar';

import { Container, Group, List, NavLink, ThemeIcon, rem } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';
import Link from 'next/link';
import dayjs from 'dayjs';


export default function Alertas() {

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
    return (
        <Container size={'xl'} bg={'green.1'}>
            <Group p={'xl'} justify='space-between'>

                <List
                    spacing="md"
                    size="sm"
                    center
                    bg={'red.1'}
                    p={'xl'}
                    icon={
                        <ThemeIcon color="red" size={24} radius="xl">
                            <IconCircleDashed style={{ width: rem(16), height: rem(16) }} />
                        </ThemeIcon>
                    }
                >
                    {filtroVinteDiasAtrasoReceita.map(item => (
                        <List.Item key={item.id}>
                            <NavLink
                                component={Link}
                                label={`${item.descricaoLancamento.length > 20
                                    ? `${item.descricaoLancamento.slice(0, 20)}...`
                                    : item.descricaoLancamento} 
                                R$ ${item.valorLancamento} - 
                                ${dayjs(item.dataCriacaoLancamento).format('YYYY-MM-DD')}`}
                                href={`/lancamentofinanceiros/registro/${item.id}`}
                                style={{ lineHeight: '1.5', paddingRight: '8px' }} />
                        </List.Item>
                    ))}

                </List>
                <List
                    spacing="md"
                    size="sm"
                    center
                    bg={'blue.1'}
                    p={'xl'}
                    icon={
                        <ThemeIcon color="blue" size={24} radius="xl">
                            <IconCircleDashed style={{ width: rem(16), height: rem(16) }} />
                        </ThemeIcon>
                    }
                >
                    {filtroVinteDiasAtrasoDespesa.map(item => (
                        <List.Item key={item.id}>
                            <NavLink
                                component={Link}
                                label={`${item.descricaoLancamento.length > 20
                                    ? `${item.descricaoLancamento.slice(0, 20)}...`
                                    : item.descricaoLancamento} 
                                R$ ${item.valorLancamento} - 
                                ${dayjs(item.dataCriacaoLancamento).format('YYYY-MM-DD')}`}
                                href={`/lancamentofinanceiros/registro/${item.id}`}
                                style={{ lineHeight: '1.5', paddingRight: '8px' }} />
                        </List.Item>
                    ))}
                </List>
            </Group>
        </Container>
    )
}

