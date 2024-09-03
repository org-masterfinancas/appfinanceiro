import PaginaInterna from "@/app/components/autenticacaooo/PaginaInterna"
import TemaMantine from "@/app/components/mantineee/tema-mantine/TemaMantine"

export default function Layout(props: any) {
  return (
    <PaginaInterna>
        <TemaMantine>
          {props.children}
        </TemaMantine>
    </PaginaInterna>
  )
}