import { Router } from 'express';
import { ServiceUsuario } from '../service/ServiceUsuario';
import Usuario from '../model/Usuario';

const router = Router();
const service = new ServiceUsuario()

//paginado
router.get('/', async (_: any, res: any) => {
  const users = await service.ObterTodos()
  return res.status(200).json({ users });
})

router.get('/todos',  async (_: any, res: any) => {
    const users = await service.ObterTodos()
    return res.status(200).json({ users });
})

router.post('/novo', async (req: any, res: any) =>{
  const { nome, email, senha }  = req.body.user

  const usuario = new Usuario(nome, email, senha)
  
  await service.adicionar(usuario);
  return res.status(201).end();
})

router.put('/alterar', async(req: any, res: any) => {
  const { user } = req.body;
  await service.alterar(user);
  return res.status(200).end();
})

router.delete('/excluir/:id', async (req: any, res: any) =>{
  const id = req.params.id;
  await service.excluir(id);
  return res.status(200).end();
})

export default router;
