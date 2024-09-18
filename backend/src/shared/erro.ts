import HttpStatusCodes from './http-status-code';

export class ServiceErro extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = 'service'
   }
}

export class ModelErro extends Error {
  constructor(mensagem: string) {
    super(mensagem)
    this.name = 'model'
  }
}

export class ControllerErro extends Error {

  public status: HttpStatusCodes;

  public constructor(status: HttpStatusCodes, mensagem: string) {
    super(mensagem);
    this.status = status;
  }
}

export class ValidacaoErro extends ControllerErro {

  public static MSG = 'Parâmetro inválido ou ausente: ';

  public constructor(paramName: string) {
    super(HttpStatusCodes.BAD_REQUEST, ValidacaoErro.GetMsg(paramName));
  }

  public static GetMsg(param: string) {
    return ValidacaoErro.MSG + param;
  }
}

