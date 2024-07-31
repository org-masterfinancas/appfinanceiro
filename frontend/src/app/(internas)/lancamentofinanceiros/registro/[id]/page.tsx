'use client'
import { LancamentoFinanceiro } from '@/app/data/model/lancamentoFinanceiro';
import useApi from '../../../hooks/useApi';
import LancamentoFinanceiroEditar from '../../../../components/LancamentoFinanceiroEditar';
import { useEffect, useState } from 'react';
import ButtonLink from '@/app/components/ButtonLink';

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
        <ButtonLink rotulo='< Voltar' link="/lancamentofinanceiros/" />
      </div>
      <div>
        <LancamentoFinanceiroEditar lancamento={lancamento} />
      </div>
    </main>
  )
}
