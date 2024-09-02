import LancamentoFinanceiroAdicionar from "@/app/components/Mantine/Lancamento/LancamentoFinanceiroAdicionar";
import { Box, Button } from "@mantine/core";
import Link from "next/link";

export default function Page() {
    return (
        <Box>
            <div>
                <Button component={Link} href="/lancamentofinanceiro/">Voltar</Button>
            </div>
            <LancamentoFinanceiroAdicionar />
        </Box>
    )
}
