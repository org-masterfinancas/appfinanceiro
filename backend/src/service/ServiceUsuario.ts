import RepositorioUsuario from '../Repositorio/RepositorioUsuario';
import ValidationError from '../errors/ValidationError';
import Usuario from '../model/Usuario';
import { UsurioSenha } from '../model/UsuarioSenha';
import Senha from '../shared/Senha';
import ServiceLogin from './ServiceLogin';

const servicoLogin = new ServiceLogin()

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

  async ObterPorId(id: string): Promise<Usuario> {
    return this.repo.obterPorId(id)
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

  async alterarSenha(usuario: UsurioSenha): Promise<void> {

    const resultadoUsuario = await this.repo.obterPorId(usuario.id);
    if (!resultadoUsuario) {
      throw new Error('404')
    }

    const resultadoSenha = await servicoLogin.loginSucesso(usuario.email, usuario.senha)

    if(!resultadoSenha.result){
      throw new ValidationError('Senha atual incorreta');
    }

    resultadoUsuario.senha = Senha.criptografar(usuario.novasenha)
    return this.repo.alterar(resultadoUsuario)

  }

  //
  async excluir(id: string): Promise<any> {
    const resultadoUsuario = await this.repo.usuarioExiste(id);
    if (!resultadoUsuario) {
      throw new Error('404')
    }
    return this.repo.excluir(id);
  }
}