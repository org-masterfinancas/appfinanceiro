import PaginaInterna from "@/app/components/autenticacao/PaginaInterna"
import TemaMantine from "@/app/components/mantine/tema-mantine/TemaMantine"

export default function Layout(props: any) {
  return (
    <PaginaInterna>
        <TemaMantine>
          {props.children}
        </TemaMantine>
    </PaginaInterna>
  )
}