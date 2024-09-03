'use client'
import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import MenuUsuario from '@/app/components/mantineee/menu-usuario/MenuUsuario';
import BarraNavegacao from '@/app/components/mantineee/barra-navegacao/BarraNavegacao';
import MeuLogo from '@/app/components/mantineee/logo/Logo';
import PageHeader from '@/app/components/mantineee/cabecalho-pagina/CabecalhoPagina';

export default function TemaMantine(props: any) {
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
          <MeuLogo />
          <MenuUsuario />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <BarraNavegacao toggle={toggle} />
      </AppShell.Navbar>
      <AppShell.Main>
        <PageHeader/>
        {props.children}
        </AppShell.Main>
    </AppShell>
  );
}
