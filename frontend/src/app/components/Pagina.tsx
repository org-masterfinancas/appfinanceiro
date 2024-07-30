
import Cabecalho from "./Cabecalho";

export default function Pagina(props: any) {
    return (
        // <div className="flex flex-col">
        //  <div>{props.children}</div>
        // </div>
        <>
            {props.children}
        </>
    )
}