"use client";
import { Box, Button, Group } from "@mantine/core";

interface FormRodapeProps {
  EhAlterado: boolean;
  novoLancamento?:boolean
  handleCancelar: () => void
  handleExcluir?: () => void
}

export default function FormRodape({ EhAlterado,novoLancamento, handleExcluir, handleCancelar }: FormRodapeProps) {
  
  if(novoLancamento){
    EhAlterado = false
  }
  return (
    <div>
    {EhAlterado ? (
      <Group mt={"xl"}>
        <Button type="submit" bg={"green.7"}>Salvar</Button>
        <Button type="button" bg={'dark.7'} onClick={handleCancelar}>Cancelar</Button>
        <Button type="button" bg={'red.7'} onClick={handleExcluir}>Excluir</Button>
      </Group>
    ):null}
     {novoLancamento ? (
      <Group mt={"xl"}>
        <Button type="submit" bg={"green.7"} >Salvar</Button>
        <Button type="button" bg={'dark.7'} onClick={handleCancelar}>Cancelar</Button>
      </Group>
    ):null}
  </div>
  )
}

