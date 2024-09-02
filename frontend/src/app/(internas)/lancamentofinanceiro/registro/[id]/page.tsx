'use client'
import useApi from '@/app/(internas)/hooks/useApi';
import LancamentoFinanceiroEditar from '@/app/components/Mantine/Lancamento/LancamentoFinanceiroEditar';
import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import Link from 'next/link';

interface LancamentoFormPageProps {
  params: { id: string };
}

export default function LancamentoFormPage({ params }: LancamentoFormPageProps) {
  const { id } = params;
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
    <main className="flex flex-col">
      <div className=''>
        <Button component={Link} href="/lancamentofinanceiro/">Voltar</Button>
      </div>
      <div>
        <LancamentoFinanceiroEditar lancamento={lancamento} />
      </div>
    </main>
  )
}
