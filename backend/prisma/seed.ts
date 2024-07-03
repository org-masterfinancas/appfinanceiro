import { PrismaClient } from '@prisma/client'
import id from '../src/shared/Id'
import { StatusLancamento } from '../src/model/enum/StatusLancamento'
import { TipoLancamento } from '../src/model/enum/TipoLancamento'
import Senha from '../src/shared/Senha'

const prisma = new PrismaClient()

async function main() {
  const usuariosData = [
    { email: 'dev@financeiro.io', senha: 'd123', nome: 'dev', descricaoLancamento: 'dev', valorLancamento: 3000 },
    { email: 'evandro@financeiro.io', senha: 'e123', nome: 'evandro', descricaoLancamento: 'aws', valorLancamento: 1850 },
    { email: 'jair@financeiro.io', senha: 'j123', nome: 'jair', descricaoLancamento: 'aws', valorLancamento: 1850 },
    { email: 'marllon@financeiro.io', senha: 'm123', nome: 'marllon', descricaoLancamento: 'aws', valorLancamento: 1850 },
    { email: 'rafael@financeiro.io', senha: 'r123', nome: 'rafael', descricaoLancamento: 'aws', valorLancamento: 1850 },
    { email: 'emannuel@financeiro.io', senha: 'e123', nome: 'emannuel', descricaoLancamento: 'aws', valorLancamento: 1850 },
    { email: 'francisco@financeiro.io', senha: 'f123', nome: 'francisco', descricaoLancamento: 'aws', valorLancamento: 1850 },
    { email: 'itajacy@financeiro.io', senha: 'i123', nome: 'itajacy', descricaoLancamento: 'aws', valorLancamento: 1850 },
    { email: 'leonardo@financeiro.io', senha: 'l123', nome: 'leonardo', descricaoLancamento: 'aws', valorLancamento: 1850 },
    { email: 'victor@financeiro.io', senha: 'v123', nome: 'victor', descricaoLancamento: 'aws', valorLancamento: 1850 }
  ];

  for (const usuarioData of usuariosData) {
    await prisma.usuarios.upsert({
      where: { email: usuarioData.email },
      update: {},
      create: {
        id: id.novo(),
        email: usuarioData.email,
        senha: Senha.criptografar(usuarioData.senha),
        nome: usuarioData.nome,
        lancamentoFinanceiros: {
          create: {
            id: id.novo(),
            descricaoLancamento: usuarioData.descricaoLancamento,
            statusLancamento: StatusLancamento.Consolidade,
            tipoLancamento: TipoLancamento.Receita,
            valorLancamento: usuarioData.valorLancamento,
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
