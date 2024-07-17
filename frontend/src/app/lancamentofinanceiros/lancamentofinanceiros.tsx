import Link from "next/link";
import { ExcluirForm } from "../components/excluirForm";

interface Usuario {
  nome: string;
}

interface Lancamento {
  id: string;
  descricaoLancamento: string;
  valorLancamento: string;
  tipoLancamento: string;
  statusLancamento: string;
  dataCriacaoLancamento: string;
  usuarioId: string;
  usuario: Usuario;
}

async function obterLancamentos(): Promise<Lancamento[]> {
  const res = await fetch('https://appfinanceiro.onrender.com/v1/lancamentofinanceiros/', {
    method: 'GET',
    cache: 'no-cache'
  })

  if (!res.ok) {
    throw new Error('Não foi possível obter os dados')
  }

  return res.json()

}


function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}


export default async function LancamentoPage() {
  const lancamentos = await obterLancamentos()

  return (
    <main className="flex bg-orange-400 min-h-screen flex-col items-center justify-between p-24">
      <Link href="/lancamentofinanceiros">
        Adicionar Lançamento
      </Link>
      <ul>
        {lancamentos.map((lancamento: Lancamento) => (
          <li className='font-bold' key={lancamento.id}>
            Id:   #{lancamento.id.split('-')[0]} |
            Descrição:  {lancamento.descricaoLancamento} |
            Status:   {lancamento.statusLancamento} |
            Data Registro:  {formatDate(lancamento.dataCriacaoLancamento)} |
            Tipo:   {lancamento.tipoLancamento} |
            valor:  {lancamento.valorLancamento} |
            Nome:   {lancamento.usuario.nome}
            <Link href={`/lancamentofinanceiros/${lancamento.id}`}>
              Editar
            </Link>
            <ExcluirForm id={lancamento.id} todo={lancamento.descricaoLancamento} />
          </li>
        ))}
      </ul>
    </main>
  )

}

