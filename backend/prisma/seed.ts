import { PrismaClient } from '@prisma/client'
import id from '../src/shared/id'
import { StatusLancamento } from '../src/model/enum/status-lancamento'
import { TipoLancamento } from '../src/model/enum/tipo-lancamento'
import Senha from '../src/shared/senha'

const prisma = new PrismaClient()

async function main() {
  const usuarios = [
    { email: 'evandro@webapp.dev.br', senha: 'e123', nome: 'evandro', sobrenome: 'sobrenome', descricaoLancamento: 'aws', valorLancamento: 1850 },
    { email: 'dev@webapp.dev.br', senha: 'd123', nome: 'dev', sobrenome: 'sobrenome', descricaoLancamento: 'dev', valorLancamento: 3000 },
    { email: 'visitante@webapp.dev.br', senha: 'v123', nome: 'Visitante', sobrenome: 'sobrenome', descricaoLancamento: 'dev', valorLancamento: 3000 }
  ]

  for (const usuario of usuarios) {
    await prisma.usuarios.upsert({
      where: { email: usuario.email },
      update: {},
      create: {
        id: id.novo(),
        email: usuario.email,
        senha: await Senha.criptografar(usuario.senha),
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        lancamentoFinanceiros: {
          create: {
            id: id.novo(),
            descricaoLancamento: usuario.descricaoLancamento,
            statusLancamento: StatusLancamento.CONSOLIDADO,
            tipoLancamento: TipoLancamento.RECEITA,
            valorLancamento: usuario.valorLancamento,
            dataCriacaoLancamento: new Date('2024-07-02')
          }
        }
      }
    });
  }

  console.log('Usuários criados com sucesso!');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
