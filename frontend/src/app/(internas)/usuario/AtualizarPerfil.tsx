import { Button, TextInput, Text } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from "react";
import useToggle from "../hooks/useToogle";
import { useToggle as useToggleMantine } from '@mantine/hooks';
import useApi from "../hooks/useApi";
import { ContextoUsuario } from "@/app/data/contexts/ContextoUsuario";
import Usuario from "@/app/data/model/usuario";

export default function AtualizarPerfil() {

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
        return "Campo não pode estar vazio";
      }
    }
  })

  useEffect(() => {
    if (usuario) {
      setCarregando(false);
    }
  }, [usuario]);

  if (carregando) return <div>...</div>

  const handleSalvar = async (formUsuario: Usuario) => {

    const dados = {
      usuario: {
        id: usuario.id,
        nome: formUsuario.nome,
        sobrenome: formUsuario.sobrenome,
        avatar: formUsuario.avatar,

      }
    }

    const resultado = await putApi('/usuarios/perfil', dados);

    if (resultado.error) {
      setMensagem(resultado.error)
    } else {
      const { nome, sobrenome, avatar } = resultado
      atualizarUsuario(nome, sobrenome, avatar)
      setMensagem("Perfil atualizado com sucesso!")
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSalvar)}>
      {mensagem && <Text c={'red'}>{JSON.stringify(mensagem)}</Text>}
      <TextInput
        {...form.getInputProps("id")}
        key={form.key("id")}
        label={"Id"}
        style={{ display: 'none' }}
        readOnly
      />
      <TextInput
        {...form.getInputProps('email')}
        key={form.key("email")}
        label={'email'}
        style={{ display: 'none' }}
        readOnly
      />
      <TextInput
        {...form.getInputProps("perfil")}
        key={form.key('perfil')}
        label={'Perfil'}
        style={{ display: 'none' }}
        readOnly
      />
      <TextInput
        {...form.getInputProps("nome")}
        key={form.key("nome")}
        label={'Nome'}
      />
      <TextInput
        {...form.getInputProps("sobrenome")}
        key={form.key("sobrenome")}
        label={'SobreNome'}
      />

      <TextInput
        {...form.getInputProps("avatar")}
        key={form.key('avatar')}
        label={'Avatar'}
      />
      <Button type="submit" mt={"md"}>Salvar</Button>
    </form>
  )
}

