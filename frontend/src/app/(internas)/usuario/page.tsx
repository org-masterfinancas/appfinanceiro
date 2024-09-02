"use client";
import useApi from "../hooks/useApi";
import useToggle from "../hooks/useToogle";
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from "react";
import { ContextoUsuario } from "@/app/data/contexts/ContextoUsuario";
import Usuario from "@/app/data/model/usuario";
import { hasLength, useForm } from '@mantine/form'
import { Avatar, Box, Button, Container, keys, Loader, Paper, Space, Text, TextInput } from "@mantine/core"
import { useToggle as useToggleMantine } from '@mantine/hooks';
import AtualizarPerfil from "@/app/(internas)/usuario/AtualizarPerfil";
import AtualizarSenha from "@/app/(internas)/usuario/AtualizarSenha";

interface UsuarioFormularioProps {
}

export default function UsuarioPage() {

  const router = useRouter();

  const [carregando, setCarregando] = useState<boolean>(true);
  const [mensagem, setMensagem] = useState<string>("");
  const [EhAlterado, atlernar] = useToggle()
  const { delApi, putApi } = useApi();
  const { usuario, atualizarUsuario } = useContext(ContextoUsuario)
  const [tipoAtualizacao, toogle] = useToggleMantine(['perfil', 'senha'])

  const form = useForm<Usuario>({
    mode: 'uncontrolled',
    initialValues:
    {
      ...usuario
    },
    validate: {
      nome: hasLength({ min: 3, max: 20 }, 'O nome de ter 3 a 20 caracteres'),
      sobrenome: hasLength({ min: 3, max: 20 }, 'O nome de ter 3 a 20 caracteres'),
      avatar: (value) => {
        if (value && value.trim() !== '') {
          return /^https:\/\/[\w\-.]+(\.[\w\-.]+)+(\/[\w\-./?%&=]*)?$/.test(value)
            ? null
            : 'URL inválida';
        }
        return null;
      }
      
    }

  })

  useEffect(() => {
    if (usuario) {
      setCarregando(false);
    }
  }, [usuario]);

  if (carregando) return <Loader color="yellow" type="bars" />


  const handleSalvar = async (formUsuario: Usuario) => {

    const dados = {
      user: {
        id: usuario.id,
        nome: formUsuario.nome,
        sobrenome: formUsuario.sobrenome,
        avatar: formUsuario.avatar,

      }
    }

    const result = await putApi('/usuarios/', dados);

    if (result === null) {
      setMensagem("Não foi possível atualizar!")
    } else if (result.error) {
      setMensagem(result.error)
    } else {
      const { nome, sobrenome, avatar } = result
      atualizarUsuario(nome, sobrenome, avatar)
      router.push('/usuarios')
    }
  }

  const handleCancelar = async () => {
    router.push('/usuarios')
  }

  return (
    <Box>
      <Container>
        <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
          <Avatar
            src={usuario.avatar}
            size={120}
            radius={120}
            mx="auto"
          />
          <Text ta="center" fz="lg" fw={500} mt="md">
            {`${usuario.nome} ${usuario.sobrenome}`}
          </Text>
          <Text ta="center" c="dimmed" fz="sm">
            {usuario.email} • {usuario.perfil}
          </Text>

          <Button variant="default" fullWidth mt="md" onClick={() => toogle()}>
            {tipoAtualizacao === 'perfil' ? 
            'Atualizar Senha' :
            'Atualizar Perfil'}
          </Button>
        </Paper>
      </Container>
      {tipoAtualizacao === 'perfil' ? <AtualizarPerfil/> : <AtualizarSenha/>}
    </Box>
  )
}