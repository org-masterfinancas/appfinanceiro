import Image from "next/image";
import MenuUsuario from "./MenuUsuario";
import ConteudoPrincipal from "./ConteudoPrincipal";

export default function ThemaIncial(props: any) {
    return (
        <>
            <div className="flex bg-zinc-100 min-h-screen  min-w-min">
                <aside className="
                flex flex-col justify-between
                bg-orange-400 w-16">
                    <div className="flex items-center justify-center h-16">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={60}
                            height={60}
                            className="rounded-full"
                        />
                    </div>
                    <MenuUsuario />
                </aside>
                <div className="flex flex-col flex-1 p-24">
                   <ConteudoPrincipal>
                    {props.children}
                   </ConteudoPrincipal>
                </div>
            </div>
        </>
    )
}