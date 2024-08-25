import PaginaInterna from "@/app/components/Autenticacao/PaginaInterna"
import ThemaMantine from "../components/Mantine/ThemaMantine"
import ThemaTailwind from "../components/Tailwind/ThemaTailwind"
import ThemaInicial from "../components/Tailwind/ThemaInicial"

export default function Layout(props: any) {
  return (
    <PaginaInterna>
      <ThemaMantine>
        {props.children}
      </ThemaMantine>
    </PaginaInterna>
  )
}