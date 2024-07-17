
export async function ObterLancamentoPorId(id: string) {
    const res = await fetch(`https://appfinanceiro.onrender.com/v1/lancamentofinanceiros/${id}`);
    if (!res.ok) {
      throw new Error('Não foi possível obter os dados do lançamento');
    }
    return res.json();
  }
  