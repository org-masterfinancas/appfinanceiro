import validator from 'validator';
import ValidationError from '../errors/ValidationError';
import LancamentoFinanceiro from '../model/LancamentoFinanceiro';

export default class ServiceValidador {

    public static emailBemFormatado(email: string): string {
        if (!email) {
            throw new ValidationError('O E-Mail deve ser informado');
        }
        email = email.trim().toLowerCase();
        if (!validator.isEmail(email)) {
            throw new ValidationError('O E-Mail informado está mal formatado');
        }
        return email;
    }

    public static senhaBemFormatada(senha: string): string {
        if (!senha) {
            throw new ValidationError('A Senha deve ser informada');
        }
        senha = senha.trim();
        if (senha.length < 3) {
            throw new ValidationError('A Senha informada está mal formatada');
        }
        return senha;
    }

    public static lancamentoFinanceiroValido(lancamento: LancamentoFinanceiro) {
        if (!lancamento) {
            throw new ValidationError('O Lançamento Financeiro deve ser informado');
        }
        if (typeof lancamento !== 'object' || Object.keys(lancamento).length === 0) {
            throw new ValidationError('O Lançamento Financeiro deve ser informado');
        }
        let { descricaoLancamento, valorLancamento, statusLancamento, tipoLancamento, dataCriacaoLancamento } = lancamento;
        if (!descricaoLancamento && valorLancamento == undefined && !statusLancamento && !tipoLancamento && !dataCriacaoLancamento) {
            throw new ValidationError('O Lançamento Financeiro deve ser informado');
        }
    }

    public static idValido(id: string): string {
        if (!id) {
            throw new ValidationError('O ID deve ser informado');
        }
        id = id.trim();
        if (!validator.isUUID(id, 4)) {
            throw new ValidationError('O ID informado está inválido');
        }
        return id.toLowerCase();
    }

    public static descricaoValida(descricao: string): string {
        if (!descricao) {
            throw new ValidationError('A Descrição deve ser informada');
        }
        descricao = descricao.trim();
        if (descricao.length < 3) {
            throw new ValidationError('A Descrição informada está inválida');
        }
        return validator.escape(descricao);
    }

   

    public static valorMonetarioValido(valor: string | number): number {
        
        if (valor === undefined) {
            throw new ValidationError('O Valor do Lançamento deve ser informado');
        }

        if (typeof valor === 'string') {
            valor = valor.trim();
        } else {
            valor = valor.toString()
        }

        const currencyOptions = {
            symbol: 'R$',
            require_symbol: false,
            allow_space_after_symbol: false,
            symbol_after_digits: false,
            allow_negatives: false,
            parens_for_negatives: false,
            negative_sign_before_digits: false,
            negative_sign_after_digits: false,
            allow_negative_sign_placeholder: false,
            thousands_separator: '.',
            decimal_separator: ',',
            allow_decimal: true,
            require_decimal: true,
            digits_after_decimal: [2],
            allow_space_after_digits: false
        }

        if (!validator.isCurrency(valor, currencyOptions)) {
            throw new ValidationError('O Valor do Lançamento informado está inválido');
        }

        valor = valor.replace('.', '').replace(',', '.');
        const valorNumerico = parseFloat(valor);

        if (valorNumerico <= 0.0) {
            throw new ValidationError('O Valor do Lançamento informado está inválido');
        }
        return Math.trunc(valorNumerico * 100) / 100;
    }

    public static tipoLancamentoValido(tipo: string): string {
        if (!tipo) {
            throw new ValidationError('O Tipo do Lançamento deve ser informado');
        }
        tipo = tipo.trim().toLowerCase();
        if (tipo !== 'despesa' && tipo !== 'receita') {
            throw new ValidationError('O Tipo do Lançamento informado está inválido');
        }
        return tipo.charAt(0).toUpperCase() + tipo.slice(1);
    }

    public static statusLancamentoValido(status: string): string {
        if (!status) {
            throw new ValidationError('O Status do Lançamento deve ser informado');
        }
        status = status.trim().toLowerCase();
        if (status !== 'cancelado' && status !== 'consolidado' && status !== 'pendente') {
            throw new ValidationError('O Status do Lançamento informado está inválido');
        }
        return status.charAt(0).toUpperCase() + status.slice(1);
    }

    public static dataLancamentoValida(data: string): Date {
        if (!data) {
            throw new ValidationError('A Data do Lançamento deve ser informada');
        }
        data = data.trim();
        if (!validator.isDate(data)) {
            throw new ValidationError('A Data do Lançamento informada está inválida');
        }
        return new Date(data);
    }

}
