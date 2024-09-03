'use client'
import useApi from '@/app/(internas)/hooks/useApi';
import { useEffect, useState } from 'react';
import { Box, Button, Container } from '@mantine/core';
import Link from 'next/link';
import Editar from '@/app/components/mantine/lancamento-financeiro/Editar';

interface LancamentoFormPageProps {
  params: { id: string };
}

export default function LancamentoFormPage({ params }: LancamentoFormPageProps) {
  
  const { id } = params

  const { getApi } = useApi()
  const [lancamento, setLancamento] = useState<any>()

  useEffect(() => {
    async function lancamentoPorId() {
      const dados = await getApi(`/lancamentofinanceiros/${id}`)
      setLancamento(dados)
    }
    lancamentoPorId()
  }, [])

  return (
    <Container>
      <div>
        <Button component={Link} href="/lancamento-financeiro/" bg={'orange.4'} mb={'md'}>Lançamentos</Button>
      </div>
      <div>
        <Editar lancamento={lancamento} />
      </div>
    </Container>
  )
}
