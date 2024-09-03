'use client'
import { LancamentoFinanceiro } from '@/app/data/model/lancamentoFinanceiro';
import { formatarMoedaBR } from '@/app/util/moeda';
import { Badge, Table, Group, Text, ActionIcon, rem } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import dayjs from 'dayjs';
import Link from 'next/link';

interface TabelaProps {
  lancamentos: LancamentoFinanceiro[]
}

const statusCores: Record<string, string> = {
  consolidado: 'green.7',
  pendente: 'yellow.7',
  cancelado: 'red.7',
}

export default function Tabela(props: TabelaProps) {
  const dados = props.lancamentos
  
  const linhas = dados.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray" component={Link} href={`/lancamento-financeiro/registro/${item.id}`}>
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={2.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.descricaoLancamento}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{formatarMoedaBR(item.valorLancamento)}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.tipoLancamento}</Text>
      </Table.Td>
      <Table.Td>
        <Badge color={statusCores[item.statusLancamento.toLowerCase()]} variant="light">
          {item.statusLancamento}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{dayjs(item.dataCriacaoLancamento).format('YYYY-MM-DD')}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.usuario?.nome}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">#{item.id?.split('-')[0]}</Text>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>Descrição</Table.Th>
            <Table.Th>Valor</Table.Th>
            <Table.Th>Tipo</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Data</Table.Th>
            <Table.Th>Usuario</Table.Th>
            <Table.Th>Id</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{linhas}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  )
}