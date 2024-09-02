'use client'
import { Group, Paper, Text } from '@mantine/core';
import {IconUserPlus, IconDiscount2, IconReceipt2, IconCoin } from '@tabler/icons-react';
import classes from './StatsGrid.module.css';
import { formatarMoedaBR } from '@/app/Utils/Moeda';

interface EstatisticasProps{
  titulo: string,
  total: number
  qtde: number
}
const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
}

const data =  { title: '', icon: 'receipt', value: 0, diff: 34 }
  
export default function Estatistica({titulo, total, qtde}: EstatisticasProps) {

    return (
      <Paper withBorder p="sm">
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            <h1>{titulo}</h1>
          </Text>
          <IconReceipt2 className={classes.icon} size="2rem" stroke={1.5} />
        </Group>
        <Text fz="xs" c="dimmed" mt={7}>
          <h2>Pendências acima de 20 DIAS</h2>
        </Text>
        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{formatarMoedaBR(total)}</Text>
          <Text c={qtde > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
            <span>{qtde} Lançamentos</span>
          </Text>
        </Group>
 
      </Paper>
    )
  }
 