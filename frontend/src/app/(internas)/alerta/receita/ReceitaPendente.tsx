'use client'
import { useEffect, useState } from 'react';
import { Table, UnstyledButton, Group, Text, Center, rem, Box, ActionIcon } from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconPencil, IconView360, IconViewportWide, IconEye } from '@tabler/icons-react';
import classes from '@/app/(internas)/alerta/shared/TabelaAlerta.module.css';
import { formatarMoedaBR } from '@/app/Utils/Moeda';
import { LancamentoTotalizado, LinhasLancamentos } from '@/app/(internas)/alerta/shared/interface';
import { ordenarDados } from '../shared/ordenacao-dados';
import Estatistica from '@/app/components/Mantine/Estatistica/Estatistica';
import Link from 'next/link';

interface ReceitaPendenteProps {
    linhasLancamentos: LinhasLancamentos[]
    receitaTotalizada: LancamentoTotalizado
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
    )
}

export default function ReceitaPendente({ linhasLancamentos, receitaTotalizada }: ReceitaPendenteProps) {

    const [sortedData, setSortedData] = useState<LinhasLancamentos[]>([])

    const [sortBy, setSortBy] = useState<keyof LinhasLancamentos | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const [estatisticaDespesa, setEstatisticaDespesa] = useState<any>({})

    useEffect(() => {
        setEstatisticaDespesa(receitaTotalizada);
        setSortedData(linhasLancamentos);
    }, [linhasLancamentos, receitaTotalizada]); 

    const setSorting = (field: keyof LinhasLancamentos) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(ordenarDados(sortedData, { sortBy: field, reversed }));
    };

    const rowsReceitas = sortedData.map((row) => (

        <Table.Tr key={row.id}>
            <Table.Td>
                <Group gap={0} justify="center" >
                    <ActionIcon variant="subtle" color="gray" component={Link} href={`/lancamentofinanceiro/registro/${row.id}`}>
                        <IconEye style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
            <Table.Td>{row.descricaoLancamento}</Table.Td>
            <Table.Td>{formatarMoedaBR(row.valorLancamento)}</Table.Td>
            <Table.Td>{row.qtdDias}</Table.Td>
        </Table.Tr>
    ))

    return (
        <Box>
            <Estatistica titulo='RECEITA' total={estatisticaDespesa.totalValor} qtde={estatisticaDespesa.quantidade} />
            <Table horizontalSpacing="md" verticalSpacing="xs" layout="fixed" highlightOnHover withTableBorder withColumnBorders>
                <Table.Tbody>
                    <Table.Tr>
                    <Table.Th />
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
                <Table.Tbody>{rowsReceitas}</Table.Tbody>
            </Table>
        </Box>
    )
}