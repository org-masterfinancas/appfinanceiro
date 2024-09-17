import CabecalhoPagina from "@/app/components/mantine/cabecalho-pagina/CabecalhoPagina";
import Adicionar from "@/app/components/mantine/lancamento-financeiro/Adicionar";
import { Box, Button, Container } from "@mantine/core";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <CabecalhoPagina/>
            <Container>
                <div>
                    <Button component={Link} href="/lancamento-financeiro/" bg={'orange.4'} mb={'md'}>Lançamentos</Button>
                </div>
                <Adicionar />
            </Container>
        </>
    )
}
