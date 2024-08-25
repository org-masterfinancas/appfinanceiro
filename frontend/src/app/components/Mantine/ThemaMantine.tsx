'use client'

import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import UserMenu from './UserMenu/UserMenu';
import NavbarSimple from './NavBar/NavbarSimple';
import HeaderMegaMenu from './Header/page';
import MeuLogo from './logo/MeuLogo';

export default function ThemaMantine(props: any) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify='space-between' p={'sm'}>
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <MeuLogo/>
          <UserMenu/>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <NavbarSimple toggle={toggle}/>
      </AppShell.Navbar>
      <AppShell.Main>{props.children}</AppShell.Main>
    </AppShell>
  );
}

