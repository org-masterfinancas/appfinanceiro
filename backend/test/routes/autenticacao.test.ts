import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import app from '../../src/app';
import DBConnection from '../../src/shared/conexao-bd';

const MAIN_ROUTE = '/usuarios/entrar';
const email = 'evandro@financeiro.io';
const senha = 'e123';

describe('entrar', async () => {

    beforeAll(() => {
        DBConnection.getConnection();
    });

    afterAll(() => {
        DBConnection.clearConnection();
    });

    test('Deve retornar um erro ao tentar efetuar login com get', async () => {
        const res = await request(app).get(MAIN_ROUTE);
        expect(res.status).toBe(405);
        expect(res.body.error).toBe('Método GET não permitido. Use POST para esta rota.');
    });

    test('Deve retornar um erro ao tentar efetuar login com put', async () => {
        const res = await request(app).put(MAIN_ROUTE);
        expect(res.status).toBe(405);
        expect(res.body.error).toBe('Método PUT não permitido. Use POST para esta rota.');
    });

    test('Deve retornar um erro ao tentar efetuar login com delete', async () => {
        const res = await request(app).delete(MAIN_ROUTE);
        expect(res.status).toBe(405);
        expect(res.body.error).toBe('Método DELETE não permitido. Use POST para esta rota.');
    });

    test('Deve retornar um erro ao tentar efetuar login sem informar o body', async () => {
        const res = await request(app).post(MAIN_ROUTE);
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O E-Mail deve ser informado');
    });

    test('Deve retornar um erro ao tentar efetuar login com e-mail ausente', async () => {
        const res = await request(app).post(MAIN_ROUTE)
            .send({ senha });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O E-Mail deve ser informado');
    });

    test('Deve retornar um erro ao tentar efetuar login com senha ausente', async () => {
        const res = await request(app).post(MAIN_ROUTE)
            .send({ email });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('A Senha deve ser informada');
    });

    test('Deve retornar um erro ao tentar efetuar login com e-mail mal formatado', async () => {
        const res = await request(app).post(MAIN_ROUTE)
            .send({ email: 'dev', senha });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O E-Mail informado está mal formatado');
    });

    test('Deve retornar um erro ao tentar efetuar login com senha mal formatada', async () => {
        const res = await request(app).post(MAIN_ROUTE)
            .send({ email, senha: 'd1' });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('A Senha informada está mal formatada');
    });

    test('Deve retornar um erro ao tentar efetuar login com e-mail não cadastrado', async () => {
        const res = await request(app).post(MAIN_ROUTE)
            .send({ email: 'inexistente@financeiro.io', senha });
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('usuário ou senha inválida.');
    });

    test('Deve retornar um erro ao tentar efetuar login com senha inválida', async () => {
        const res = await request(app).post(MAIN_ROUTE)
            .send({ email, senha: 'invalida' });
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('usuário ou senha inválida.');
    });

    test('Deve retornar um token ao efetuar login com e-mail e senha válidos', async () => {
        const res = await request(app).post(MAIN_ROUTE)
            .send({ email, senha });
        expect(res.status).toBe(200);
        expect(res.body).has.property('token');
        // const token_b64  = res.body.token.split('.')[1];
        // const token_str = Buffer.from(token_b64, 'base64').toString('utf-8');
        // const token_json = JSON.parse(token_str);
        // console.log('token_json', token_json, typeof token_json);
        // const id_usuario = token_json.id;
        // console.log('id_usuario', id_usuario);
    });

});
