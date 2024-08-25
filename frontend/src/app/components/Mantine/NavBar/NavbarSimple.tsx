'use client'
import { useState } from 'react';
import { Group, Code, Button } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconChartDots2
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './NavbarSimple.module.css';
import Link from 'next/link';

interface NavbarSimpleProps {
  toggle: () => void;
}
const data = [
  { link: '/lancamentofinanceiros', label: 'Lançamentos', icon: IconReceipt2 },
  { link: '/dashboard', label: 'Dashboard', icon: IconChartDots2 },
  { link: '/alertas', label: 'Alertas', icon: IconBellRinging },
  { link: '/usuarios/', label: 'Usuário', icon: IconFingerprint },
];

export default function NavbarSimple({toggle}: NavbarSimpleProps) {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
        toggle()
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {links}
      </div>
    </nav>
  );
}