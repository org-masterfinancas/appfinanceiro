import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const usuarios = [
    { id: '4950cb39-c335-4365-880b-7081fc8c87a0', email: 'evandro@webapp.dev.br', senha: '$2b$05$l/ESacSyfV7KYA5Ybt/w4elOrF3DyduSknpt6wAbL9f/.2oe1ULgq', nome: 'evandro', sobrenome: 'sobrenome', descricaoLancamento: 'aws', valorLancamento: 1850 },
    { id: '0d58d580-3fc2-40c8-942f-fd4825cbd550', email: 'dev@webapp.dev.br', senha: '$2b$05$mOqQu7rWbotvBBgQdcpZeepejI3Zf8W5lz7bTl7UAfjzaO8bQPalm', nome: 'dev', sobrenome: 'sobrenome', descricaoLancamento: 'dev', valorLancamento: 3000 },
    { id: '7ae78fc9-fda4-4c1d-8cfb-325f2b0e4489', email: 'visitante@webapp.dev.br', senha: '$2b$05$ZMTze5WasX4N2qGvaqk5y.LJaRxoq5JW.g6YXm3xR3KHzT31hSah6', nome: 'Visitante', sobrenome: 'sobrenome', descricaoLancamento: 'dev', valorLancamento: 3000 }
  ]

  await prisma.lancamentoFinanceiros.deleteMany()
  await prisma.usuarios.deleteMany()

  for (const usuario of usuarios) {
    await prisma.usuarios.upsert({
      where: { email: usuario.email },
      update: {},
      create: {
        id: usuario.id,
        email: usuario.email,
        senha: usuario.senha,
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        lancamentoFinanceiros: {
          create: {
            id: usuario.id,
            descricaoLancamento: usuario.descricaoLancamento,
            statusLancamento: 'Pendente',
            tipoLancamento: 'Receita',
            valorLancamento: usuario.valorLancamento,
            dataCriacaoLancamento: new Date('2024-10-30')
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