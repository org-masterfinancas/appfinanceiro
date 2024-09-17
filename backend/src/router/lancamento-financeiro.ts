import { Router } from 'express';
import paths from '../shared/paths';
import lancamentoFinanceiro from '@src/controller/lancamento-financeiro';

const lancamentoFinanceiroRota = Router();

lancamentoFinanceiroRota.get(paths.lancamentoFinanceiros.obter, lancamentoFinanceiro.obter,);
lancamentoFinanceiroRota.get(paths.lancamentoFinanceiros.obterTodos, lancamentoFinanceiro.obterTodos,);
lancamentoFinanceiroRota.post(paths.lancamentoFinanceiros.novo, lancamentoFinanceiro.novo,);
lancamentoFinanceiroRota.put(paths.lancamentoFinanceiros.atualizar, lancamentoFinanceiro.atualizar,);
lancamentoFinanceiroRota.delete(paths.lancamentoFinanceiros.excluir, lancamentoFinanceiro.excluir,);

export default lancamentoFinanceiroRota