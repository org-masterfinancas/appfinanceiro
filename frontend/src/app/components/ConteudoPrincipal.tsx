export default function ConteudoPrincipal(props: any) {
    return (
        <main className="flex-1"> {/**flex-1 pt-10 px-36 */}
            {props.children}
        </main>
    )
}