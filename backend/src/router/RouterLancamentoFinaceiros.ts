import { Request, Response, Router } from "express";
import ServiceLancamentoFinanceiros from '../service/ServiceLancamentoFinanceiros'
import LancamentoFinanceiro from "../model/LancamentoFinanceiro";
import ServiceValidador from "../service/ServiceValidador";

const router = Router()
const service = new ServiceLancamentoFinanceiros()


router.get('/todos', async (req:Request, res: Response) => {
    const todosLancamentos = await service.ObterTodos()
    res.status(200).send(todosLancamentos)

})

router.get('/todos/:id', async (req:Request, res:Response) => {
    let { id } = req.params
    id = ServiceValidador.idValido(id);
    const lancamento = await service.ObterPorIdLancamentoFinanceiro(id)
    if (lancamento) {
        res.status(200).send(lancamento)
        return
    }
    res.sendStatus(404)
})


//todos de um usuário
router.get('/', async (req: Request, res: Response) => {
    const usuarioId = req.usuarioId
    let status = req.query?.status as string || '';
    if (status) {
        status = status.trim().toLowerCase();
        if (status !== 'cancelado' && status !== 'consolidado' && status !== 'pendente') {
            status = ''
        }
    }
    const todosLancamentosDeUmUsuario = await service.ObterTodosDeUmUsuario(usuarioId, status)
    res.status(200).send(todosLancamentosDeUmUsuario)

})
//novo de um usuário
router.post('/', async (req:Request, res:Response) => {

    ServiceValidador.lancamentoFinanceiroValido(req.body.lancamentofinanceiro);
    let { descricaoLancamento, valorLancamento, statusLancamento, tipoLancamento, dataCriacaoLancamento } = req.body.lancamentofinanceiro ?? {};
    descricaoLancamento = ServiceValidador.descricaoValida(descricaoLancamento);
    valorLancamento = ServiceValidador.valorMonetarioValido(valorLancamento);
    statusLancamento = ServiceValidador.statusLancamentoValido(statusLancamento);
    tipoLancamento = ServiceValidador.tipoLancamentoValido(tipoLancamento);
    dataCriacaoLancamento = ServiceValidador.dataLancamentoValida(dataCriacaoLancamento);

    const lancamentoNovo = new LancamentoFinanceiro(descricaoLancamento, valorLancamento, tipoLancamento, statusLancamento, dataCriacaoLancamento)

    const usuarioId = req.usuarioId

    const resultado = await service.Novo(lancamentoNovo, usuarioId)
    res.status(201).json({ ...resultado });
})

//alterar de um usuário
router.put('/:id', async (req: Request, res: Response) => {
    let idParams = req.params.id
    idParams = ServiceValidador.idValido(idParams);
    ServiceValidador.lancamentoFinanceiroValido(req.body.lancamentofinanceiro);

    const usuarioId = req.usuarioId;
    const lancamentoOriginal = await service.ObterUmPorUsuario(idParams, usuarioId);
    if (!lancamentoOriginal) {
        res.sendStatus(404);
        return;
    }

    let { descricaoLancamento, valorLancamento, statusLancamento, tipoLancamento, dataCriacaoLancamento } = req.body.lancamentofinanceiro
   
        descricaoLancamento = ServiceValidador.descricaoValida(descricaoLancamento);
        valorLancamento = ServiceValidador.valorMonetarioValido(valorLancamento);
        statusLancamento = ServiceValidador.statusLancamentoValido(statusLancamento);
        tipoLancamento = ServiceValidador.tipoLancamentoValido(tipoLancamento);
        dataCriacaoLancamento = ServiceValidador.dataLancamentoValida(dataCriacaoLancamento);

    const lancamento = new LancamentoFinanceiro(descricaoLancamento, valorLancamento, tipoLancamento, statusLancamento, dataCriacaoLancamento, idParams)

    const lancamentoAlterado =  await service.alterar(lancamento, usuarioId)
    return res.status(200).send(lancamentoAlterado)
})

//excluir de um usuário
router.delete('/:id', async (req: Request, res: Response) => {
    let id = req.params.id
    id = ServiceValidador.idValido(id);
    const usuarioId = req.usuarioId

    const lancamentoExcluido = await service.excluir(id, usuarioId)

    return res.status(200).send(lancamentoExcluido)
})



//obter um Por Usuário
router.get('/:id', async (req:Request, res:Response) => {
    let { id } = req.params
    id = ServiceValidador.idValido(id);
    const usuarioId = req.usuarioId

    const lancamento = await service.ObterUmPorUsuario(id, usuarioId)
    if (lancamento) {
        res.status(200).json({ ...lancamento });
        return
    }
    res.status(404).json({ error: 'Lançamento não encontrado' });
})

router.use(async (req: Request, res: Response) => {
    res.status(400).json({ error: 'Rota ou Método não tratados' });
});

export default router



