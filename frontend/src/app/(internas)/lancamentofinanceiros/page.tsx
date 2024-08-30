'use client'
import useApi from "../hooks/useApi"
import { LancamentoFinanceiro } from "@/app/data/model/lancamentoFinanceiro"
import { useEffect, useState, useContext } from "react"
import LancamentoFinanceiroFiltro from "@/app/components/Mantine/Lancamento/LancamentoFinanceiroFiltro"
import { ContextoUsuario } from "../../data/contexts/ContextoUsuario"
import Link from "next/link"
import { Box, Button, Container, Group, Select, Stack, Text, Paper, Pagination, TextInput, rem, keys } from "@mantine/core"
import LancamentoFinanceiroTabela from "@/app/components/Mantine/Lancamento/LancamentoFinanceiroTabela/LancamentoFinanceiroTabela"
import { IconSearch } from "@tabler/icons-react"


function aplicarPesquisa(data: LancamentoFinanceiro[], search: string) {
    const query = search.toLowerCase().trim();
  
    return data.filter((item) => {
      return (
        item.descricaoLancamento.toLowerCase().includes(query) ||
        item.tipoLancamento.toLowerCase().includes(query) ||
        item.usuario.nome.toLowerCase().includes(query) ||
        item.valorLancamento.toString().toLowerCase().includes(query)
      );
    });
  }
  

export default function LancamentoPage() {
    const { getApi } = useApi()
    const [carregando, setCarregando] = useState<boolean>(true);
    const { usuario } = useContext(ContextoUsuario)
    const [lancamentos, setLancamentos] = useState<LancamentoFinanceiro[]>([]);
    const [filtroStatus, setFiltroStatus] = useState<string>("Todos")

    const [activePage, setActivePage] = useState<number>(1)
    const itemsPerPage = 5

    const [search, setSearch] = useState('')



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
    }, [filtroStatus, search]);

    if (carregando) return <div>...</div>

    const lancamentosFiltrados = filtroStatus === "Todos" || filtroStatus == null
        ? lancamentos
        : lancamentos.filter(lancamento => lancamento.statusLancamento === filtroStatus);


    const lancamentosPesquisa = aplicarPesquisa(lancamentosFiltrados, search);

    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = lancamentosPesquisa.slice(startIndex, endIndex);


    return (
        <Container size={"xl"}>
            <Group justify="space-between">
                <Paper radius="md" withBorder p="xs">
                    <Text>Minhas Finanças</Text>
                    <Text>Você possui {lancamentosPesquisa.length || 0} registro(s)</Text>
                </Paper>
                <TextInput
                    placeholder="Buscar Lançamento"
                    mb="md"
                    leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Group>
                    <LancamentoFinanceiroFiltro 
                        labelTexto="Filtro por Status"
                        valor={filtroStatus}
                        valorMudou={setFiltroStatus}
                    />
                    <Button component={Link} href="/lancamentofinanceiros/registro">+ Novo Lançamento</Button>
                </Group>
            </Group>
            {lancamentosPesquisa.length ?
                <>
                    <LancamentoFinanceiroTabela lancamentos={currentItems} />
                    <Pagination
                        defaultValue={activePage}
                        onChange={setActivePage}
                        total={Math.ceil(lancamentosPesquisa.length / itemsPerPage)}
                    />
                </>
                :
                <Container size={"xs"}>
                    <Text p={"xl"}>
                        Olá {usuario.nome}, você não possui lançamento cadastrado! 
                    </Text>
                    <Text p={"xl"}>
                      Nenhuma correspondência de filtro ou busca!
                    </Text>
                </Container>
            }
        </Container>
    )
}
