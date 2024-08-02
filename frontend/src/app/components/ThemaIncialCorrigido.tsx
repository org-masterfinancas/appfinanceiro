import Image from "next/image";
import MenuUsuario from "./MenuUsuario";

export default function ThemaIncialCorrigdo(props: any) {
    return (
        <>
            <div className="
            min-h-screen
            min-w-min
            flex 
            bg-pink-100
            "
            >
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
                <div className="flex flex-col flex-1 border-2 border-green-500">
                    <main className="pt-10 px-36 flex-1">
                        {props.children}
                    </main>
                </div>
               
            </div>
        </>
    )
}