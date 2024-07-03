import RepositorioUsuario from '../Repositorio/RepositorioUsuario';
import Usuario from '../model/Usuario';
import Senha from '../shared/Senha';

export class ServiceUsuario {
  private repo: RepositorioUsuario

  constructor() {
    this.repo = new RepositorioUsuario()
  }
  //
  async ObterTodos(): Promise<Usuario[]> {
    return this.repo.ObterTodos();
  }

  async ObterPorEmail(email: string): Promise<Usuario> {
    return this.repo.obterPorEmail(email)
  }

  async ObterIdPorEmail(email: string): Promise<string> {
    const usuario = await this.repo.obterPorEmail(email)
    const id = usuario.id
    return id
  }

  //
  adicionar(user: Usuario): Promise<void> {

    const senhaUsuario = user.senha ? user.senha : null

    if (senhaUsuario) {
      user.senha = Senha.criptografar(senhaUsuario)
      return this.repo.adicionar(user);
    } else {
      return this.repo.adicionar(user)
    }
  }

  //
  async alterar(usuario: Usuario): Promise<void> {

    const resultadoUsuario = await this.repo.usuarioExiste(usuario.id);
    if (!resultadoUsuario) {
      throw new Error('404')
    }
    return this.repo.alterar(usuario);
  }

  //
  async excluir(id: string): Promise<void> {
    const resultadoUsuario = await this.repo.usuarioExiste(id);
    if (!resultadoUsuario) {
      throw new Error('404')
    }
    return this.repo.excluir(id);
  }
}