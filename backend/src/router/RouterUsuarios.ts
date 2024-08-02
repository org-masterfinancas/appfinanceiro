import { Router } from 'express';
import { ServiceUsuario } from '../service/ServiceUsuario';
import Usuario from '../model/Usuario';

const router = Router();
const service = new ServiceUsuario()

router.get('/:id', async (req: any, res: any) => {
  const id = req.params.id;
  const usuario = await service.ObterPorId(id);
  if (!usuario) {
    res.sendStatus(404)
    return
  }
  return res.status(200).send(usuario);

})



router.delete('/:id', async (req: any, res: any) => {
  const id = req.params.id;
  const usuario = await service.excluir(id);
  if (!usuario) {
    res.sendStatus(404)
  }
  return res.status(200).send(usuario);
})

router.put('/', async (req: any, res: any) => {
  const { user } = req.body;

  const usuarioAtualizado = await service.alterar(user);
  return res.status(200).send(usuarioAtualizado);
})
router.get('/', async (_: any, res: any) => {
  const users = await service.ObterTodos()
  return res.status(200).json({ users });
})

router.post('/', async (req: any, res: any) => {
  const { nome, sobrenome, email, senha, perfil, avatar } = req.body.user

  const usuario = new Usuario(nome, sobrenome, email, senha, perfil, avatar)

  await service.adicionar(usuario);
  return res.status(201).end();
})


export default router;
