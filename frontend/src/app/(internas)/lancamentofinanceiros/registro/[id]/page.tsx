'use client'
import EditarForm from '@/app/components/editarForm';
import { LancamentoFinanceiro } from '@/app/data/model/lancamentoFinanceiro';
import useApi from '../../../hooks/useApi';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import BotaoLink from '@/app/components/BotaoLInk';

interface LancamentoFormPageProps {
  params: { id: string };
}

export default function LancamentoFormPage({ params }: LancamentoFormPageProps) {
  const { id } = params;
  const { getApi } = useApi()
  const [lancamento, setLancamento] = useState<LancamentoFinanceiro>()

  useEffect(() => {
    async function lancamentoPorId() {
      const dados = await getApi(`/lancamentofinanceiros/${id}`)
      setLancamento(dados)
    }
    lancamentoPorId()
  }, [])


  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className='p-10'>
        <BotaoLink rotulo='Início' link="/lancamentofinanceiros/"/>
      </div>
      <EditarForm lancamento={lancamento} />
    </main>
  )
}
