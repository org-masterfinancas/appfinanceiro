import request from 'supertest';
import { afterAll, beforeAll, describe, expect, expectTypeOf, test } from 'vitest'

import app from '../../src/app';
import DBConnection from '../../src/shared/conexao-bd';

const MAIN_ROUTE = '/lancamentofinanceiros';

describe('lancamentofinanceiros', async () => {
    const LOGIN_ROUTE = '/usuarios/entrar';
    const email = 'evandro@financeiro.io';
    const senha = 'e123';
    let token: string;
    const lancamentofinanceiro = {
        descricaoLancamento: 'Lançamento para teste',
        valorLancamento: 123.45,
        tipoLancamento: 'Despesa',
        statusLancamento: 'Consolidado',
        dataCriacaoLancamento: '2024-07-02'
    };
    const id_inexistente = '00000000-0000-4000-8000-000000000000';
    const id_invalido = '00000000-0000-0000-0000-000000000000';
    let lancamentoConsulta;
    let lancamentoAtualizacao;
    let lancamentoExclusao;
    let id_usuario;

    beforeAll(async () => {
        DBConnection.getConnection();

        let res = await request(app).post(LOGIN_ROUTE)
            .send({ email, senha });
        expect(res.status).toBe(200);
        expect(res.body).has.property('token');
        token = res.body.token;
        // const token_b64  = res.body.token.split('.')[1];
        // const token_str = Buffer.from(token_b64, 'base64').toString('utf-8');
        // const token_json = JSON.parse(token_str);
        // console.log('token_json', token_json, typeof token_json);
        // id_usuario = token_json.id;
        // console.log('id_usuario', id_usuario);        

        res = await request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro });
        expect(res.status).toBe(201);
        expect(res.body).to.be.an('object');
        expect(res.body).has.property('id');
        expect(res.body).has.property('descricaoLancamento');
        expect(res.body).has.property('valorLancamento');
        expect(res.body).has.property('tipoLancamento');
        expect(res.body).has.property('statusLancamento');
        expect(res.body).has.property('dataCriacaoLancamento');
        expect(res.body).has.property('usuarioId');
        expect(res.body.descricaoLancamento).toBe(lancamentofinanceiro.descricaoLancamento);
        expect(res.body.valorLancamento).toBe(lancamentofinanceiro.valorLancamento.toString());
        expect(res.body.tipoLancamento).toBe(lancamentofinanceiro.tipoLancamento);
        expect(res.body.statusLancamento).toBe(lancamentofinanceiro.statusLancamento);
        expect(res.body.dataCriacaoLancamento).contains(lancamentofinanceiro.dataCriacaoLancamento);
        lancamentoConsulta = res.body;

        res = await request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro });
        expect(res.status).toBe(201);
        expect(res.body).to.be.an('object');
        lancamentoAtualizacao = res.body;

        res = await request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro });
        expect(res.status).toBe(201);
        expect(res.body).to.be.an('object');
        lancamentoExclusao = res.body;
    });

    afterAll(() => {
        DBConnection.clearConnection();
    });

    test('Deve retornar um erro ao tentar acessar lista de lançamentos sem o token', async () => {
        const res = await request(app).get(MAIN_ROUTE);
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('O Token deve ser informado');
    });

    test('Deve retornar um erro ao tentar acessar lista de lançamentos com um token inválido', async () => {
        const res = await request(app).get(MAIN_ROUTE)
            .set('authorization', `bearer abc.def.ghi`);
        expect(res.status).toBe(403);
        expect(res.body.error).toBe('O Token informado está inválido');
    });
    test('Deve retornar uma lista de lançamentos', async () => {
        const res = await request(app).get(MAIN_ROUTE)
            .set('authorization', `bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).to.be.an('array');
    });

    test('Deve retornar uma lista de lançamentos quando informado um filtro', async () => {
        const res = await request(app).get(`${MAIN_ROUTE}?status=consolidado`)
            .set('authorization', `bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).to.be.an('array');
    });

    test('Deve retornar um erro ao tentar consultar um lançamento sem o token', async () => {
        const res = await request(app).get(`${MAIN_ROUTE}/${id_inexistente}`);
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('O Token deve ser informado');
    });

    test('Deve retornar um erro ao consultar um lançamento com id inválido', async () => {
        const res = await request(app).get(`${MAIN_ROUTE}/${id_invalido}`)
            .set('authorization', `bearer ${token}`);
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O ID informado está inválido');
    });

    test('Deve retornar um erro ao consultar um lançamento com id inexistente', async () => {
        const res = await request(app).get(`${MAIN_ROUTE}/${id_inexistente}`)
            .set('authorization', `bearer ${token}`);
        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Lançamento não encontrado');
    });

    test('Deve retornar um lançamento por id', async () => {
        const res = await request(app).get(`${MAIN_ROUTE}/${lancamentoConsulta.id}`)
            .set('authorization', `bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).to.be.an('object');
        expect(res.body).has.property('id');
        expect(res.body).has.property('descricaoLancamento');
        expect(res.body).has.property('valorLancamento');
        expect(res.body).has.property('tipoLancamento');
        expect(res.body).has.property('statusLancamento');
        expect(res.body).has.property('dataCriacaoLancamento');
        expect(res.body).has.property('usuarioId');
        expect(res.body.id).toBe(lancamentoConsulta.id);
        expect(res.body.descricaoLancamento).toBe(lancamentofinanceiro.descricaoLancamento);
        expect(res.body.valorLancamento).toBe(lancamentofinanceiro.valorLancamento.toString());
        expect(res.body.tipoLancamento).toBe(lancamentofinanceiro.tipoLancamento);
        expect(res.body.statusLancamento).toBe(lancamentofinanceiro.statusLancamento);
    });

    test('Deve retornar um erro ao tentar incluir um lançamento sem o token', async () => {
        const res = await request(app).post(MAIN_ROUTE);
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('O Token deve ser informado');
    });

    test('Deve retornar um erro ao tentar incluir um lançamento sem as informações', async () => {
        const res = await request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${token}`);
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O Lançamento Financeiro deve ser informado');
    });

    test('Deve retornar um erro ao tentar incluir um lançamento com payload vazio', async () => {
        const res = await request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: {} });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O Lançamento Financeiro deve ser informado');
    });

    test('Deve retornar um erro ao tentar incluir um lançamento sem a descrição', async () => {
        const { descricaoLancamento, ...lancamento } = lancamentofinanceiro;
        const res = await request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('A Descrição deve ser informada');
    });

    test('Deve retornar um erro ao tentar incluir um lançamento com a descrição inválida', async () => {
        let lancamento = { ...lancamentofinanceiro, descricaoLancamento: 'a' };
        const res = await request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('A Descrição informada está inválida');
    });

    test('Deve retornar um erro ao tentar incluir um lançamento sem o valor', async () => {
        const { valorLancamento, ...lancamento } = lancamentofinanceiro;
        const res = await request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O Valor do Lançamento deve ser informado');
    });

    test('Deve retornar um erro ao tentar incluir um lançamento com o valor inválido', async () => {
        let lancamento = { ...lancamentofinanceiro, valorLancamento: -123.45 };
        const res = await request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O Valor do Lançamento informado está inválido');
    });

    test('Deve retornar um erro ao tentar incluir um lançamento sem o tipo de lançamento', async () => {
        const { tipoLancamento, ...lancamento } = lancamentofinanceiro;
        const res = await request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O Tipo do Lançamento deve ser informado');
    });

    test('Deve retornar um erro ao tentar incluir um lançamento com o tipo de lançamento inválido', async () => {
        let lancamento = { ...lancamentofinanceiro, tipoLancamento: 'abc' };
        const res = await request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O Tipo do Lançamento informado está inválido');
    });

    test('Deve retornar um erro ao tentar incluir um lançamento sem o status de lançamento', async () => {
        const { statusLancamento, ...lancamento } = lancamentofinanceiro;
        const res = await request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O Status do Lançamento deve ser informado');
    });

    test('Deve retornar um erro ao tentar incluir um lançamento com o status de lançamento inválido', async () => {
        let lancamento = { ...lancamentofinanceiro, statusLancamento: 'abc' };
        const res = await request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O Status do Lançamento informado está inválido');
    });

    test('Deve retornar um erro ao tentar incluir um lançamento sem a data do lançamento', async () => {
        const { dataCriacaoLancamento, ...lancamento } = lancamentofinanceiro;
        const res = await request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('A Data do Lançamento deve ser informada');
    });

    test('Deve retornar um erro ao tentar incluir um lançamento com a data do lançamento inválido', async () => {
        let lancamento = { ...lancamentofinanceiro, dataCriacaoLancamento: 'abc' };
        const res = await request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('A Data do Lançamento informada está inválida');
    });

    test('Deve retornar um erro ao tentar alterar um lançamento sem o token', async () => {
        const res = await request(app).put(`${MAIN_ROUTE}/${lancamentoConsulta.id}`);
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('O Token deve ser informado');
    });

    test('Deve retornar um erro ao tentar alterar um lançamento sem o id', async () => {
        const res = await request(app).put(MAIN_ROUTE)
            .set('authorization', `bearer ${token}`);
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Rota ou Método não tratados');
    });

    test('Deve retornar um erro ao tentar alterar um lançamento sem as informações', async () => {
        const res = await request(app).put(`${MAIN_ROUTE}/${id_inexistente}`)
            .set('authorization', `bearer ${token}`);
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O Lançamento Financeiro deve ser informado');
    });

    test('Deve retornar um erro ao tentar alterar um lançamento com payload vazio', async () => {
        const res = await request(app).put(`${MAIN_ROUTE}/${id_inexistente}`)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: {} });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O Lançamento Financeiro deve ser informado');
    });

    test('Deve retornar um erro ao tentar alterar um lançamento com a descrição inválida', async () => {
        let lancamento = { descricaoLancamento: 'a' };
        const res = await request(app).put(`${MAIN_ROUTE}/${lancamentoAtualizacao.id}`)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('A Descrição informada está inválida');
    });

    test('Deve retornar um erro ao tentar alterar um lançamento com valor zerado', async () => {
        let lancamento = { valorLancamento: 0.0 };
        const res = await request(app).put(`${MAIN_ROUTE}/${lancamentoAtualizacao.id}`)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O Valor do Lançamento informado está inválido');
    });

    test('Deve retornar um erro ao tentar alterar um lançamento com o valor negativo', async () => {
        let lancamento = { valorLancamento: -123.45 };
        const res = await request(app).put(`${MAIN_ROUTE}/${lancamentoAtualizacao.id}`)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O Valor do Lançamento informado está inválido');
    });

    test('Deve retornar um erro ao tentar alterar um lançamento com o valor inválido', async () => {
        let lancamento = { valorLancamento: 'abc' };
        const res = await request(app).put(`${MAIN_ROUTE}/${lancamentoAtualizacao.id}`)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O Valor do Lançamento informado está inválido');
    });

    test('Deve retornar um erro ao tentar alterar um lançamento com o tipo de lançamento inválido', async () => {
        let lancamento = { tipoLancamento: 'abc' };
        const res = await request(app).put(`${MAIN_ROUTE}/${lancamentoAtualizacao.id}`)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O Tipo do Lançamento informado está inválido');
    });

    test('Deve retornar um erro ao tentar alterar um lançamento com o status de lançamento inválido', async () => {
        let lancamento = { statusLancamento: 'abc' };
        const res = await request(app).put(`${MAIN_ROUTE}/${lancamentoAtualizacao.id}`)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O Status do Lançamento informado está inválido');
    });

    test('Deve retornar um erro ao tentar alterar um lançamento com a data do lançamento inválida', async () => {
        let lancamento = { dataCriacaoLancamento: 'abc' };
        const res = await request(app).put(`${MAIN_ROUTE}/${lancamentoAtualizacao.id}`)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('A Data do Lançamento informada está inválida');
    });

    test('Deve retornar um erro ao tentar alterar um lançamento com o id inválido', async () => {
        const res = await request(app).put(`${MAIN_ROUTE}/${id_invalido}`)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O ID informado está inválido');
    });

    test('Deve retornar um erro ao tentar alterar um lançamento com o id inexistente', async () => {
        const res = await request(app).put(`${MAIN_ROUTE}/${id_inexistente}`)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro });
        expect(res.status).toBe(404);
    });

    test('Deve alterar um lançamento informando apenas a descrição', async () => {
        let lancamento = { descricaoLancamento: 'Descrição alterada' };
        const res = await request(app).put(`${MAIN_ROUTE}/${lancamentoAtualizacao.id}`)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(200);
        expect(res.body).to.be.an('object');
        expect(res.body).has.property('id');
        expect(res.body).has.property('descricaoLancamento');
        expect(res.body.descricaoLancamento).toBe('Descrição alterada');
    });

    test('Deve alterar um lançamento informando apenas o valor', async () => {
        let lancamento = { valorLancamento: 123.45 };
        const res = await request(app).put(`${MAIN_ROUTE}/${lancamentoAtualizacao.id}`)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(200);
        expect(res.body).to.be.an('object');
        expect(res.body).has.property('id');
        expect(res.body).has.property('valorLancamento');
        expect(res.body.valorLancamento).toBe('123.45');
    });

    test('Deve alterar um lançamento informando apenas o tipo de lançamento', async () => {
        let lancamento = { tipoLancamento: 'Receita' };
        const res = await request(app).put(`${MAIN_ROUTE}/${lancamentoAtualizacao.id}`)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(200);
        expect(res.body).to.be.an('object');
        expect(res.body).has.property('id');
        expect(res.body).has.property('tipoLancamento');
        expect(res.body.tipoLancamento).toBe('Receita');
    });

    test('Deve alterar um lançamento informando apenas o status de lançamento', async () => {
        let lancamento = { statusLancamento: 'Pendente' };
        const res = await request(app).put(`${MAIN_ROUTE}/${lancamentoAtualizacao.id}`)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(200);
        expect(res.body).to.be.an('object');
        expect(res.body).has.property('id');
        expect(res.body).has.property('statusLancamento');
        expect(res.body.statusLancamento).toBe('Pendente');
    });

    test('Deve alterar um lançamento informando apenas a data do lançamento', async () => {
        let lancamento = { dataCriacaoLancamento: '2024-07-07' };
        const res = await request(app).put(`${MAIN_ROUTE}/${lancamentoAtualizacao.id}`)
            .set('authorization', `bearer ${token}`)
            .send({ lancamentofinanceiro: lancamento });
        expect(res.status).toBe(200);
        expect(res.body).to.be.an('object');
        expect(res.body).has.property('id');
        expect(res.body).has.property('dataCriacaoLancamento');
        expect(res.body.dataCriacaoLancamento).contains('2024-07-07');
    });

    test('Deve retornar um erro ao tentar excluir um lançamento sem o token', async () => {
        const res = await request(app).delete(`${MAIN_ROUTE}/${lancamentoExclusao.id}`);
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('O Token deve ser informado');
    });

    test('Deve retornar um erro ao tentar excluir um lançamento sem o id', async () => {
        const res = await request(app).delete(MAIN_ROUTE)
            .set('authorization', `bearer ${token}`);
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Rota ou Método não tratados');
    });

    test('Deve retornar um erro ao tentar excluir um lançamento com o id inválido', async () => {
        const res = await request(app).delete(`${MAIN_ROUTE}/${id_invalido}`)
            .set('authorization', `bearer ${token}`);
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O ID informado está inválido');
    });

    test('Deve retornar um erro ao tentar excluir um lançamento com o id inexistente', async () => {
        const res = await request(app).delete(`${MAIN_ROUTE}/${id_inexistente}`)
            .set('authorization', `bearer ${token}`);
        expect(res.status).toBe(404);
    });

    test('Deve excluir um lançamento com id existente', async () => {
        const res = await request(app).delete(`${MAIN_ROUTE}/${lancamentoExclusao.id}`)
            .set('authorization', `bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).to.be.an('object');
        expect(res.body).has.property('id');
        expect(res.body.id).toBe(lancamentoExclusao.id);
    });

});
