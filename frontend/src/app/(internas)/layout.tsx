import PaginaInterna from "@/app/components/Autenticacao/PaginaInterna"
import ThemaMantine from "../components/Mantine/ThemaMantine"

export default function Layout(props: any) {
  return (
    <PaginaInterna>
        <ThemaMantine>
          {props.children}
        </ThemaMantine>
    </PaginaInterna>
  )
}