import PaginaInterna from "@/app/components/PaginaInterna";
import MenuUsuario from "../components/MenuUsuario"
import Image from "next/image";
import Thema from "../components/ThemaTailwindEmplilhado";
import TemaInicial from "../components/ThemaInicial";
import ThemaIncialCorrigdo from "../components/ThemaIncialCorrigido";
import ThemaIncial from "../components/ThemaInicial";
import ThemaTailwindEmplilhado from "../components/ThemaTailwindEmplilhado";

export default function Layout(props: any) {
    return (
        <PaginaInterna>
              <ThemaTailwindEmplilhado>
                {props.children}
              </ThemaTailwindEmplilhado>
        </PaginaInterna>
    )
}