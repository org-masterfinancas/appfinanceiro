import { useContext } from "react"
import Pagina from "./Pagina"
import ForcarUsuarioLogado from "./ForcarUsuarioLogado"

export default function PaginaInterna(props: any){
    
    return(
          <ForcarUsuarioLogado>
              <Pagina>{props.children}</Pagina>  
          </ForcarUsuarioLogado>
    )
}
