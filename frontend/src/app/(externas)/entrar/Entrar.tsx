'use client'
import classes from './Entrar.module.css';
import useApi from '@/app/(internas)/hooks/useApi';
import { Text, TextInput, PasswordInput, Checkbox, Paper, Title, Container, Group, Button } from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { useContext, useEffect, useState } from 'react';
import { ContextoUsuario } from '@/app/data/contexts/ContextoUsuario';
import { useRouter } from 'next/navigation';

type UsuarioLogin = {
    email: string
    senha: string
}


export default function Entrar() {
    const route = useRouter()

    const { login } = useContext(ContextoUsuario)
    const { postApi } = useApi()
    const [resultadoLogin, setResultadoLogin] = useState({ retornoLogin: '', token: '' })
    const [mensagem, setMensagem] = useState<string>("");

    const form = useForm<UsuarioLogin>({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            senha: '',
        },
        validate: {
            email: isEmail('E-mail Inválido'),
            senha: isNotEmpty('Senha vazia')
        }
    })

    useEffect(() => {
        const entrar = async () => {
            if (resultadoLogin.retornoLogin === 'ok') {
                await login(resultadoLogin.token)

                route.push('/lancamento-financeiro')
            }
        }
        entrar()
    }, [resultadoLogin.retornoLogin]);

    const handleLogin = async (dados: UsuarioLogin) => {
        const resultado = await postApi('/usuarios/entrar', dados);

        if (resultado.error) {
            setMensagem(resultado.error)
        } else if (resultado.token)
            setResultadoLogin({ retornoLogin: 'ok', token: resultado.token })
    }

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Controle Financeiro
            </Title>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                {mensagem && <Text c={"red"}>{JSON.stringify(mensagem)}</Text>}
                <form onSubmit={form.onSubmit(handleLogin)}>
                    <TextInput
                        {...form.getInputProps('email')}
                        key={form.key('email')}
                        label="E-mail"
                        placeholder="visitante@webapp.dev.br"
                        size="md"
                        required />

                    <PasswordInput
                        {...form.getInputProps('senha')}
                        key={form.key('senha')}
                        label="Senha"
                        placeholder="v123"
                        mt="md"
                        size="md"
                        required />
                    <Group justify="space-between" mt="lg">
                        <Checkbox label="Lembrar-me" />
                    </Group>
                    <Button fullWidth mt="xl" type='submit'>
                        Entrar
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}