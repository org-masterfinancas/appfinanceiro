import { ModelErro } from "@src/shared/erro"
import validator from "validator"

const EMAIL_INVALIDO = 'E-mail inválido'
const NOME_INVALIDO = 'Nome inválido'
const SOBRENOME_INVALIDO = 'Sobrenome inválido'
const SENHA_INVALIDO = 'Senha inválido'
const NOVA_SENHA_INVALIDO = 'Senha inválido'
const URL_IMAGEM_INVALIDA = 'URL imagem inválida'

export interface IUsuario {
  id: string
  nome: string
  sobrenome: string
  email: string
  dataCriacao: Date
  senha: string
  perfil: string
  avatar: string
  novaSenha?: string
}

function validarNome(obj: IUsuario) {
  if (typeof obj.nome !== 'string') {
    throw new ModelErro(NOME_INVALIDO)
  }
}

function validarSobreNome(obj: IUsuario) {
  if (typeof obj.sobrenome !== 'string') {
    throw new ModelErro(SOBRENOME_INVALIDO)
  }
}

function validarSenha(obj: IUsuario) {
  if (typeof obj.senha !== 'string') {
    throw new ModelErro(SENHA_INVALIDO)
  }
}

function validarNovaSenha(obj: IUsuario) {
  if (typeof obj.novaSenha !== 'string') {
    throw new ModelErro(NOVA_SENHA_INVALIDO)
  }
}

function validarEmail(obj: IUsuario) {
  if (typeof obj.email !== 'string' || !validator.isEmail(obj.email)) {
    throw new ModelErro(EMAIL_INVALIDO)
  }

}

function validarAvatar(obj: IUsuario) {
  if (typeof obj.avatar !== 'string' ||
    !validator.isURL(obj.avatar, { protocols: ['https'] })) {
    throw new ModelErro(URL_IMAGEM_INVALIDA)
  }

}

function ehUsuario(arg: unknown): arg is IUsuario {
  if (typeof arg !== 'object' || arg === null) return false

  const obj = arg as IUsuario

  validarNome(obj)
  validarSobreNome(obj)
  validarEmail(obj)

  return true
}

function ehUsuarioPerfil(arg: unknown): arg is IUsuario {
  if (typeof arg !== 'object' || arg === null) return false

  const obj = arg as IUsuario

  validarNome(obj)
  validarSobreNome(obj)
  validarAvatar(obj)

  return true
}

function ehUsuarioSenha(arg: unknown): arg is IUsuario {
  if (typeof arg !== 'object' || arg === null) return false

  const obj = arg as IUsuario

  validarSenha(obj)
  validarNovaSenha(obj)

  return true
}

export default {
  ehUsuario,
  ehUsuarioPerfil,
  ehUsuarioSenha,
} as const