'use client'
import useApi from "../hooks/useApi"
import { LancamentoFinanceiro } from "@/app/data/model/lancamentoFinanceiro"
import { useEffect, useState, useContext } from "react"
import LancamentoFinanceiroFiltro from "@/app/components/Mantine/Lancamento/LancamentoFinanceiroFiltro"
import { ContextoUsuario } from "../../data/contexts/ContextoUsuario"
import Link from "next/link"
import { Box, Button, Container, Group, Select, Stack, Text, Paper, Pagination } from "@mantine/core"
import LancamentoFinanceiroTabela from "@/app/components/Mantine/Lancamento/LancamentoFinanceiroTabela/LancamentoFinanceiroTabela"

export default function LancamentoPage() {
    const { getApi } = useApi()
    const [carregando, setCarregando] = useState<boolean>(true);
    const { usuario } = useContext(ContextoUsuario)
    const [lancamentos, setLancamentos] = useState<LancamentoFinanceiro[]>([]);
    const [filtroStatus, setFiltroStatus] = useState<string>("Todos")
    const [activePage, setActivePage] = useState<number>(1)
    const itemsPerPage = 5

    useEffect(() => {
        async function obterLancamentos() {
            const dados = await getApi('/lancamentofinanceiros/')
            setLancamentos(dados);
            setCarregando(false);
        }
        obterLancamentos();
    }, [])

    useEffect(() => {
        setActivePage(1);
    }, [filtroStatus]);

    if (carregando) return <div>...</div>

    const lancamentosFiltrados = filtroStatus === "Todos" || filtroStatus == null
        ? lancamentos
        : lancamentos.filter(lancamento => lancamento.statusLancamento === filtroStatus);

    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = lancamentosFiltrados.slice(startIndex, endIndex);

    return (
        <Container size={"xl"}>
            <Group justify="space-between">
                <Paper radius="md" withBorder p="xs">
                    <Text>Minhas Finanças</Text>
                    <Text>Você possui {lancamentosFiltrados.length || 0} registro(s)</Text>
                </Paper>
                <Group>
                    <LancamentoFinanceiroFiltro
                        labelTexto="Filtro por Status"
                        valor={filtroStatus}
                        valorMudou={setFiltroStatus}
                    />
                    <Button component={Link} href="/lancamentofinanceiros/registro">+ Novo Lançamento</Button>
                </Group>
            </Group>
            {lancamentosFiltrados.length ?
                <>
                    <LancamentoFinanceiroTabela lancamentos={currentItems} />
                    <Pagination
                        value={activePage}
                        onChange={setActivePage}
                        total={Math.ceil(lancamentosFiltrados.length / itemsPerPage)}
                    />
                </>
                :
                <Container size={"xs"}>
                    <Text p={"xl"}>
                        Olá {usuario.nome}, você não possui lançamento cadastrado!
                    </Text>
                </Container>
            }
        </Container>
    )
}
