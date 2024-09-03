"use client";
import { Button, Text } from '@mantine/core'

interface FormCabecalhoProps {
  EhAlterado: boolean;
  alternar: () => void;
  novoLancamento?: boolean
}

export default function FormCabecalho({ EhAlterado, alternar, novoLancamento }: FormCabecalhoProps) {
  return (
    <div>
      {novoLancamento ?
        <div>
         <Text>Modo: Visualização</Text>
        </div>
        :
        <div>
          <div>
             {EhAlterado ? <Text>Modo: Edição</Text> : <Text>Visualização</Text>}
          </div>
          {!EhAlterado ? (
            <Button size='sm' mt={'md'} mb={'md'} onClick={alternar}>Editar</Button>
          ) : null}
        </div>
      }
    </div>
  )
}

