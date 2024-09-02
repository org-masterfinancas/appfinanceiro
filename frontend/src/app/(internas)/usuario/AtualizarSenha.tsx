import { Button, TextInput, Text, PasswordInput } from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useRouter } from 'next/navigation';
import { useContext,useState } from "react";
import useApi from "../hooks/useApi";
import { ContextoUsuario } from "@/app/data/contexts/ContextoUsuario";
import Usuario from "@/app/data/model/usuario";


interface AtualizarSenha {
    senha: string,
    novasenha: string,
    confirmaSenha: string
}
export default function AtualizarSenha() {

  const router = useRouter();

  const [mensagem, setMensagem] = useState<string>("");
  const { putApi } = useApi();
  const { usuario, atualizarUsuario } = useContext(ContextoUsuario)

  const form = useForm<AtualizarSenha>({
    mode: 'uncontrolled',
    validate: {
      senha: isNotEmpty('Senha vazia'),
      novasenha: isNotEmpty('Nova Senha vazia'),
      confirmaSenha: (value, values) => 
        value !== values.novasenha ? 'Senhas diferentes' : null
    }
  })

  const handleSalvar = async (formUsuario: AtualizarSenha) => {

    const dados = {
      usuarioSenha: {
        id: usuario.id,
        email: usuario.email,
        senha: formUsuario.senha,
        novasenha: formUsuario.novasenha,
      }
    }

    const result = await putApi('/usuarios/senha', dados);

    if (result === null) {
      setMensagem("Não foi possível atualizar!")
    } else if (result.error) {
      setMensagem(result.error)
    } else {
      setMensagem('Senha Atualizada com sucesso!')
      router.push('/usuarios')
    }
  }
  return (
    <form onSubmit={form.onSubmit(handleSalvar)}>
      {mensagem && <Text c={'red'}>{JSON.stringify(mensagem)}</Text>}
      <PasswordInput
        {...form.getInputProps('senha')}
        key={form.key("senha")}
        label={'Senha Atual'}
        placeholder="Digite sua senha atual"
      />
      <PasswordInput
        {...form.getInputProps('novasenha')}
        key={form.key("novasenha")}
        label={'Nova Senha'}
        placeholder="Digite a nova senha"
      />
       <PasswordInput
        mt={"sm"}
        {...form.getInputProps('confirmaSenha')}
        key={form.key("confirmaSenha")}
        label={'Confirmar Senha'}
        placeholder="Confirme a nova senha"
      />
      <Button type="submit" mt={"md"}>Salvar</Button>
    </form>
  )
}

