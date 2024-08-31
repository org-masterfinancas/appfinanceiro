import React from 'react';
import { Group, Text, Button, Divider } from '@mantine/core';

export default function PageHeader() {
  return (
    <div>
      <Group  align="center" mb="xl" justify='start'> 
        <Text size="xl" >
          Lançamentos
        </Text>
      </Group>
      <Divider mb={'md'} />
    </div>
  );
}
