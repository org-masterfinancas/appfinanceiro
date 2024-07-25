import PaginaInterna from "@/app/components/PaginaInterna";

export default function Layout(props:any){
    return(
        <PaginaInterna>
            {props.children}
        </PaginaInterna>
    )
}