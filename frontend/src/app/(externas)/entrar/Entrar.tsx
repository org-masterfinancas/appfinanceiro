'use client'
import { Paper, TextInput, PasswordInput, Button, Title, Text } from '@mantine/core';
import classes from './Entrar.module.css';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { ContextoUsuario } from '@/app/data/contexts/ContextoUsuario';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import useApi from '@/app/(internas)/hooks/useApi';

type UsuarioLogin = {
  email: string
  senha: string
}

export default function Entrar() {

  const route = useRouter()

  const { login, usuario } = useContext(ContextoUsuario)
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
    const result = await postApi('/login', dados);
    if (result === null) {
      setMensagem("Não Foi possível Logar!")
    } else if (result.error) {
      setMensagem(result.error)
    } else {
      setResultadoLogin({ retornoLogin: 'ok', token: result.token })
    }
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <form onSubmit={form.onSubmit(handleLogin)}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Lançamento Financeiro
          </Title>
          {mensagem && <Text c={"red"}>{JSON.stringify(mensagem)}</Text>}

          <TextInput
            {...form.getInputProps('email')}
            key={form.key('email')}
            label="E-mail"
            placeholder="Digite seu e-mail"
            size="md" />

          <PasswordInput
            {...form.getInputProps('senha')}
            key={form.key('senha')}
            label="Senha"
            placeholder="Digite sua senha"
            mt="md"
            size="md" />

          <Button fullWidth mt="xl" size="md" type='submit'>
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}