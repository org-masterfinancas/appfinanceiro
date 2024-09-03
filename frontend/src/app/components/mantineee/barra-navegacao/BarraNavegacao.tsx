'use client'
import { useState } from 'react';
import { IconBellRinging, IconFingerprint, IconReceipt2, IconChartDots2 } from '@tabler/icons-react';
import classes from './BarraNavegacao.module.css';
import Link from 'next/link';

interface NavbarSimpleProps {
  toggle: () => void;
}
const data = [
  { link: '/lancamento-financeiro', label: 'Lançamentos', icon: IconReceipt2 },
  { link: '/dashboard', label: 'Dashboard', icon: IconChartDots2 },
  { link: '/alerta', label: 'Alertas', icon: IconBellRinging },
  { link: '/usuario/', label: 'Usuário', icon: IconFingerprint },
];

export default function BarraNavegacao({toggle}: NavbarSimpleProps) {
  const [active, setActive] = useState('Lançamentos');

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
  )
}