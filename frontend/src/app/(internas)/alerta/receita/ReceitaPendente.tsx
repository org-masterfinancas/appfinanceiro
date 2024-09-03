'use client'
import { useEffect, useState } from 'react';
import { Table, UnstyledButton, Group, Text, Center, rem, Box, ActionIcon } from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconEye } from '@tabler/icons-react';
import classes from '@/app/(internas)/alerta/shared/TabelaAlerta.module.css';
import { formatarMoedaBR } from '@/app/util/moeda';
import { LancamentoTotalizado, LinhasLancamentos } from '@/app/(internas)/alerta/shared/interface';
import { ordenarDados } from '../shared/ordenacao-dados';
import Estatistica from '@/app/components/mantineee/estatistica/Estatistica';
import Link from 'next/link';

interface ReceitaPendenteProps {
    linhasLancamentos: LinhasLancamentos[]
    receitaTotalizada: LancamentoTotalizado
}

interface ThProps {
    children: React.ReactNode;
    invertido: boolean;
    classificado: boolean;
    classificar(): void;
}

function Th({ children, invertido, classificado, classificar }: ThProps) {
    const Icon = classificado ? (invertido ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <Table.Th className={classes.th}>
            <UnstyledButton onClick={classificar} className={classes.control}>
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

    const [dadosClassificado, setDadosClassificado] = useState<LinhasLancamentos[]>([])

    const [classificarPor, setClassificarPor] = useState<keyof LinhasLancamentos | null>(null);
    const [inverterClassificacao, setInverterClassificacao] = useState(false);

    const [estatisticaReceita, setEstatisticaReceita] = useState<any>({})

    useEffect(() => {
        setEstatisticaReceita(receitaTotalizada);
        setDadosClassificado(linhasLancamentos);
    }, [linhasLancamentos, receitaTotalizada]); 

    const classificandoPor = (campo: keyof LinhasLancamentos) => {
        const invertido = campo === classificarPor ? !inverterClassificacao : false;
        setInverterClassificacao(invertido);
        setClassificarPor(campo);
        setDadosClassificado(ordenarDados(dadosClassificado, { ordenarPor: campo, invertido }));
    };

    const linhasReceitas = dadosClassificado.map((linha) => (

        <Table.Tr key={linha.id}>
            <Table.Td>
                <Group gap={0} justify="center" >
                    <ActionIcon variant="subtle" color="gray" component={Link} href={`/lancamento-financeiro/registro/${linha.id}`}>
                        <IconEye style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
            <Table.Td>{linha.descricaoLancamento}</Table.Td>
            <Table.Td>{formatarMoedaBR(linha.valorLancamento)}</Table.Td>
            <Table.Td>{linha.qtdDias}</Table.Td>
        </Table.Tr>
    ))

    return (
        <Box>
            <Estatistica titulo='RECEITA' total={estatisticaReceita.totalValor} qtde={estatisticaReceita.quantidade} />
            <Table horizontalSpacing="md" verticalSpacing="xs" layout="fixed" highlightOnHover withTableBorder withColumnBorders>
                <Table.Tbody>
                    <Table.Tr>
                    <Table.Th />
                        <Th
                            classificado={classificarPor === 'descricaoLancamento'}
                            invertido={inverterClassificacao}
                            classificar={() => classificandoPor('descricaoLancamento')}
                        >
                            Descrição
                        </Th>
                        <Th
                            classificado={classificarPor === 'valorLancamento'}
                            invertido={inverterClassificacao}
                            classificar={() => classificandoPor('valorLancamento')}
                        >
                            Valor
                        </Th>
                        <Th
                            classificado={classificarPor === 'qtdDias'}
                            invertido={inverterClassificacao}
                            classificar={() => classificandoPor('qtdDias')}
                        >
                            Dias
                        </Th>
                    </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>{linhasReceitas}</Table.Tbody>
            </Table>
        </Box>
    )
}