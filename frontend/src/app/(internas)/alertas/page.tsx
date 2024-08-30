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
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from './TableSort.module.css';
import useApi from '@/app/(internas)/hooks/useApi';
import { FiltrarLancamentoAtrasadoDespesas, FiltrarLancamentoAtrasadoReceitas } from '@/app/(internas)/alertas/dadosFiltrar';
import { LancamentoFinanceiro } from '@/app/data/model/lancamentoFinanceiro';

interface LinhasLancamentos {
    id: string;
    descricaoLancamento: string;
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
    payload: { sortBy: keyof LinhasLancamentos ; reversed: boolean } 
) {
    const { sortBy } = payload;

    if (!sortBy) return data

   return [...data].sort((a, b) => {
        if (payload.reversed) {
            return b[sortBy].localeCompare(a[sortBy]);
        }

        return a[sortBy].localeCompare(b[sortBy]);
    })
}

export default function TableSort() {

    const { getApi } = useApi()
    const [carregando, setCarregando] = useState<boolean>(true)
    const [filtroVinteDiasAtrasoDespesa, setFiltroVinteDiasAtrasoDespesa] = useState<LinhasLancamentos[]>([])
    const [filtroVinteDiasAtrasoReceita, setFiltroVinteDiasAtrasoReceita] = useState<LinhasLancamentos[]>([])

    //const [sortedData, setSortedData] = useState(filtroVinteDiasAtrasoDespesa);
    const [sortedData, setSortedData] = useState<LinhasLancamentos[]>([])
    const [sortBy, setSortBy] = useState<keyof LinhasLancamentos | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (field: keyof LinhasLancamentos) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(filtroVinteDiasAtrasoDespesa, { sortBy: field, reversed })); 
    };

    

    useEffect(() => {
        async function obterLancamentos() {
            const dados = await getApi('/lancamentofinanceiros/')
            const resultadoDespesas = FiltrarLancamentoAtrasadoDespesas(dados)
            const resultadoReceitas = FiltrarLancamentoAtrasadoReceitas(dados)
            setFiltroVinteDiasAtrasoDespesa(resultadoDespesas)
            setFiltroVinteDiasAtrasoReceita(resultadoReceitas)
            setSortedData(resultadoDespesas)
        }
        obterLancamentos()
    }, [])
 
    const rowsDespesas = sortedData.map((row) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.descricaoLancamento}</Table.Td>
            <Table.Td>{row.id}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Container>
            <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
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
                            sorted={sortBy === 'id'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('id')}
                        >
                            Id
                        </Th>
                    </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>
                    {rowsDespesas}                  
                </Table.Tbody>
            </Table>
        </Container>
    );
}