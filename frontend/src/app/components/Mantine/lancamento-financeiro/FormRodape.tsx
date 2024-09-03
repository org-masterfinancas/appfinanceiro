"use client";
import { Box, Button } from "@mantine/core";

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
      <Box>
        <Button type="submit">Salvar</Button>
        <Button type="button" onClick={handleCancelar}>Cancelar</Button>
        <Button type="button" onClick={handleExcluir}>Excluir</Button>
      </Box>
    ):null}
     {novoLancamento ? (
      <div>
        <Button type="submit" >Salvar</Button>
        <Button type="button" onClick={handleCancelar}>Cancelar</Button>
      </div>
    ):null}
  </div>
  )
}

