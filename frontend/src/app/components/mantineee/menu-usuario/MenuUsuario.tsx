'use client'
import cx from 'clsx';
import { useContext, useState } from 'react';
import { Avatar, UnstyledButton, Group, Text, Menu, rem} from '@mantine/core';
import { IconLogout, IconChevronDown} from '@tabler/icons-react';
import classes from './MenuUsuario.module.css';
import { ContextoUsuario } from '@/app/data/contexts/ContextoUsuario';
import Link from 'next/link';

export default function MenuUsuario() {
  const [userMenuOpened, setUserMenuOpened] = useState(true);
  const { usuario } = useContext(ContextoUsuario)

  return (
    <Group justify="space-between">
      <Menu
        width={260}
        position="bottom-end"
        transitionProps={{ transition: 'pop-top-right' }}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton
            className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
          >
            <Group gap={7}>
              <Avatar src={usuario.avatar } alt={usuario.nome} radius="md" size={30}  />
              <Text fw={500} size="sm" lh={1} mr={3}>
                {usuario.nome}
              </Text>
              <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
            </Group>
          </UnstyledButton>

        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>App</Menu.Label>
          <Menu.Item component={Link} href={'/sair'}
            leftSection={
              <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            }
          >
            Sair
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}