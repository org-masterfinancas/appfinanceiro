'use client'

import { LancamentoFinanceiro } from '@/app/data/model/lancamentoFinanceiro';
import { Avatar, Badge, Table, Group, Text, ActionIcon, Anchor, rem } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import Link from 'next/link';


interface LancamentoFinanceiroTabelaProps {
  lancamentos?: LancamentoFinanceiro[]
}

const jobColors: Record<string, string> = {
  engineer: 'blue',
  manager: 'cyan',
  designer: 'pink',
};

export default function LancamentoFinanceiroTabela(props: LancamentoFinanceiroTabelaProps) {
  const data = props.lancamentos

  const rows = data?.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Text fz="sm">{item.id}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.descricaoLancamento}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.valorLancamento}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.tipoLancamento}</Text>
      </Table.Td>
      <Table.Td>
        <Badge color={jobColors[item.statusLancamento.toLowerCase()]} variant="light">
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
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray" component={Link} href={`/lancamentofinanceiros/registro/${item.id}`}>
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>Descrição</Table.Th>
            <Table.Th>Valor</Table.Th>
            <Table.Th>Tipo</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Data</Table.Th>
            <Table.Th>Usuario</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}