import { notFound } from 'next/navigation';
import { ObterLancamentoPorId } from '../RequisicaoLancamento';
import AddForm from '@/app/components/AddForm';

interface Lancamento {
  descricaoLancamento: string;
  valorLancamento: string;
  tipoLancamento: string;
  statusLancamento: string;
  dataCriacaoLancamento: string;
}

interface LancamentoFormPageProps {
  params: { id: string };
}

export default async function LancamentoFormPage({ params }: LancamentoFormPageProps) {
  const { id } = params;
  let lancamento: Lancamento | null = null;

  try {
    lancamento = await ObterLancamentoPorId(id);
  } catch (error) {
    console.error(error);
  }

  if (!lancamento) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AddForm lancamento={lancamento} />
    </main>
  );
}
