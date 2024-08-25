'use client'
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from '@mantine/core';
import classes from './AuthenticationImage.module.css';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import useApi from '@/app/(internas)/hooks/useApi';
import { ContextoUsuario } from '@/app/data/contexts/ContextoUsuario';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';

type UsuarioLogin = {
  email: string
  senha: string
  manterseLogado: boolean
}

export default function AuthenticationImage() {

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
      manterseLogado: true,
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

        route.push('/lancamentofinanceiros')
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
  <form className={classes.wrapper} onSubmit={form.onSubmit(handleLogin)}>
   
    <Paper className={classes.form} radius={0} p={30}>
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

      <Checkbox 
      {...form.getInputProps('manterseLogado')}
      key={form.key('manterseLogado')}
      label="Manter-se logado" 
      mt="xl" 
      size="md" 
      checked={form.values.manterseLogado}
      />
      <Button fullWidth mt="xl" size="md" type='submit'>
        Login
      </Button>
    </Paper>
  </form>
);
}