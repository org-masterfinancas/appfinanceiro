'use client'
import EditarForm from '@/app/components/editarForm';
import { LancamentoFinanceiro } from '@/app/data/model/lancamentoFinanceiro';
import useApi from '../../../hooks/useApi';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import BotaoLink from '@/app/components/BotaoLink';
import FormularioLancamentoFinanceiros from '@/app/components/FormularioLancamentoFinanceiros';
import { formatDate } from '@/app/Utils/utilsdata';

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
    <main className="flex flex-col">
      <div className=''>
        <BotaoLink rotulo='< Voltar' link="/lancamentofinanceiros/" />
      </div>
      <div>
        <FormularioLancamentoFinanceiros lancamento={lancamento} />
      </div>
    </main>
  )
}
