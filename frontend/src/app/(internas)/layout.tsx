import PaginaInterna from "@/app/components/PaginaInterna";
import MenuUsuario from "../components/MenuUsuario";

export default function Layout(props: any) {
    return (
        <PaginaInterna>
            <div className="flex bg-zinc-100 min-h-screen">
                <aside className="
                flex flex-col justify-between
                bg-orange-400 w-16">
                    <div className="text-white">Logo</div>
                    <MenuUsuario />
                </aside>
                <div className="flex flex-col flex-1">
                    <main className="flex-1 pt-10 px-36">
                        {props.children}
                    </main>
                </div>
            </div>
        </PaginaInterna>
    )
}