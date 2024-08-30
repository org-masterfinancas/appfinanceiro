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

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

const data =  { title: 'DESPESAS PENDENTES', icon: 'receipt', value: 'R$ 2.500,45', diff: 34 }
  
export default function Stats1() {
    const Icon = data.icon

    return (
      <Paper withBorder p="md" radius="md">
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {data.title}
          </Text>
          <IconReceipt2 className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{data.value}</Text>
          <Text c={data.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
            <span>{data.diff} Lançamentos</span>
          </Text>
        </Group>
        <Text fz="xs" c="dimmed" mt={7}>
          Pendências acima de 20 DIAS
        </Text>
      </Paper>
    )
  }
 