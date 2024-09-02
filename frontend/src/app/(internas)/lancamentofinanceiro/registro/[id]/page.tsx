'use client'
import useApi from '@/app/(internas)/hooks/useApi';
import LancamentoFinanceiroEditar from '@/app/components/mantine/lancamento-financeiro/LancamentoFinanceiroEditar';
import { useEffect, useState } from 'react';
import { Box, Button } from '@mantine/core';
import Link from 'next/link';

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
        <LancamentoFinanceiroEditar lancamento={lancamento} />
      </div>
    </Box>
  )
}
