'use client'
import { useEffect, useState } from 'react';
import {
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    TextInput,
    rem,
    keys,
    Container,
    Stack,
    SimpleGrid,
    Box,
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from './TableSort.module.css';
import useApi from '@/app/(internas)/hooks/useApi';
import dayjs from 'dayjs';
import { formatarMoedaBR } from '@/app/Utils/Moeda';
import Stats1 from '@/app/(externas)/state1/page';
import { FiltrarLancamentoAtrasadoDespesas } from '@/app/(internas)/alertas/despesaFiltrar';
import { FiltrarLancamentoAtrasadoReceitas } from './receitaFiltrar';

interface LinhasLancamentos {
    id: string
    descricaoLancamento: string,
    dataCriacaoLancamento: Date,
    valorLancamento: number,
    qtdDias: number
}


interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <Table.Th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group justify="space-between">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </Table.Th>
    );
}


function sortData(
    data: LinhasLancamentos[],
    payload: { sortBy: keyof LinhasLancamentos; reversed: boolean }
) {
    const { sortBy } = payload;

    if (!sortBy) return data;

    return [...data].sort((a, b) => {
        let compareResult = 0;

        if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') {
            compareResult = a[sortBy].localeCompare(b[sortBy]);
        } else if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
            compareResult = a[sortBy] - b[sortBy];
        } else if (a[sortBy] instanceof Date && b[sortBy] instanceof Date) {
            compareResult = (a[sortBy] as Date).getTime() - (b[sortBy] as Date).getTime();
        }

        return payload.reversed ? -compareResult : compareResult;
    });
}

export default function TableSort() {

    const { getApi } = useApi()
    const [carregando, setCarregando] = useState<boolean>(true)
    const [filtroVinteDiasAtrasoDespesa, setFiltroVinteDiasAtrasoDespesa] = useState<LinhasLancamentos[]>([])
    const [filtroVinteDiasAtrasoReceita, setFiltroVinteDiasAtrasoReceita] = useState<LinhasLancamentos[]>([])

    const [sortedData, setSortedData] = useState<LinhasLancamentos[]>([])
    const [sortedDataReceita, setSortedDataReceita] = useState<LinhasLancamentos[]>([])

    const [sortBy, setSortBy] = useState<keyof LinhasLancamentos | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const [estatisticaDespesa, setEstatisticaDespesa] = useState<any>({})
    const [estatisticaReceita, setEstatisticaReceita] = useState<any>({})

    const setSorting = (field: keyof LinhasLancamentos) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(filtroVinteDiasAtrasoDespesa, { sortBy: field, reversed }));
    };



    useEffect(() => {
        async function obterLancamentos() {
            const dados = await getApi('/lancamentofinanceiros/')

            const resultadoDespesa = FiltrarLancamentoAtrasadoDespesas(dados)
            const { despesaFiltrada, despesaTotalizada} = resultadoDespesa
            setEstatisticaDespesa(despesaTotalizada)
            setSortedData(despesaFiltrada)
            setFiltroVinteDiasAtrasoDespesa(despesaFiltrada)

        }
        obterLancamentos()
    }, [])

    const rowsDespesas = sortedData.map((row) => (

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
                    <Stats1 titulo='DESPESAS PENDENTES' total={estatisticaDespesa.totalValor} qtde={estatisticaDespesa.quantidade} />
                    <Table horizontalSpacing="md" verticalSpacing="xs" layout="fixed" bg={'red.6'}>
                        <Table.Tbody>
                            <Table.Tr>
                                <Th
                                    sorted={sortBy === 'descricaoLancamento'}
                                    reversed={reverseSortDirection}
                                    onSort={() => setSorting('descricaoLancamento')}
                                >
                                    Descrição
                                </Th>
                                <Th
                                    sorted={sortBy === 'valorLancamento'}
                                    reversed={reverseSortDirection}
                                    onSort={() => setSorting('valorLancamento')}
                                >
                                    Valor
                                </Th>
                                <Th
                                    sorted={sortBy === 'qtdDias'}
                                    reversed={reverseSortDirection}
                                    onSort={() => setSorting('qtdDias')}
                                >
                                    Dias
                                </Th>
                            </Table.Tr>
                        </Table.Tbody>
                        <Table.Tbody>{rowsDespesas}</Table.Tbody>
                    </Table>
                </Box>
                <Box>
                </Box>
            </SimpleGrid>
        </Container>
    );
}