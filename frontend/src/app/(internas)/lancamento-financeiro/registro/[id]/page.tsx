'use client'
import useApi from '@/app/(internas)/hooks/useApi';
import { useEffect, useState } from 'react';
import { Box, Button } from '@mantine/core';
import Link from 'next/link';
import Editar from '@/app/components/mantine/lancamentofinanceiro/Editar';

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
    <Box>
      <div>
        <Button component={Link} href="/lancamentofinanceiro/">Voltar</Button>
      </div>
      <div>
        <Editar lancamento={lancamento} />
      </div>
    </Box>
  )
}
