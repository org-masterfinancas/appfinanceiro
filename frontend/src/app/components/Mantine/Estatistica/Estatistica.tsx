'use client'
import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from '@tabler/icons-react';
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
};


const data =  { title: '', icon: 'receipt', value: 0, diff: 34 }
  
export default function Estatistica({titulo, total, qtde}: EstatisticasProps) {

    return (
      <Paper withBorder p="md" radius="md">
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {titulo}
          </Text>
          <IconReceipt2 className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{formatarMoedaBR(total)}</Text>
          <Text c={qtde > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
            <span>{qtde} Lançamentos</span>
          </Text>
        </Group>
        <Text fz="xs" c="dimmed" mt={7}>
          Pendências acima de 20 DIAS
        </Text>
      </Paper>
    )
  }
 