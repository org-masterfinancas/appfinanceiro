'use client'
import { useState } from 'react';
import { Pagination } from '@mantine/core';

function PaginatedLancamentoFinanceiro({ lancamentoFinanceiro }) {
  // Estado para gerenciar a página ativa
  const [activePage, setPage] = useState(1);

  // Número de itens por página
  const itemsPerPage = 5;

  // Calcule o número total de páginas
  const totalPages = Math.ceil(lancamentoFinanceiro.length / itemsPerPage);

  // Calcule os itens da página atual
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = lancamentoFinanceiro.slice(startIndex, endIndex);

  return (
    <div>
      {/* Renderize os itens da página atual */}
      <ul>
        {currentItems.map((item, index) => (
          <li key={index}>
            {/* Renderize os detalhes do item */}
            {item.nome} - {item.valor} - {item.data}
          </li>
        ))}
      </ul>

      {/* Componente de paginação */}
      <Pagination value={activePage} onChange={setPage} total={totalPages} />
    </div>
  );
}

// Exemplo de uso com um array fictício de lançamentos financeiros
const lancamentoFinanceiro = [
  { nome: 'Salário', valor: 5000, data: '2024-08-01' },
  { nome: 'Aluguel', valor: -1500, data: '2024-08-03' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  { nome: 'Mercado', valor: -500, data: '2024-08-05' },
  // ...mais itens
];

function App() {
  return <PaginatedLancamentoFinanceiro lancamentoFinanceiro={lancamentoFinanceiro} />;
}

export default App;
