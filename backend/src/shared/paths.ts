export default {
  base: '/',
  entrar: '/usuarios/entrar',
  usuarios: {
    base: '/usuarios',
    obterTodos: '/todos',
    obter: '/:id',
    excluir: '/:id',
    novo: '/',
    atualizar: '/',
    atualizarPerfil: '/perfil',
    atualizarSenha: '/senha',
  },
  lancamentoFinanceiros: {
    base: '/lancamentofinanceiros',
    atualizar: '/:id',
    excluir: '/:id', 
    obter: '/:id',
    obterTodos: '/',
    novo: '/',
  },
} as const;
