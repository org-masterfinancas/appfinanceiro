'use client'
import { useNavigate } from "react-router-dom";

export default function useNavegar() {
    const navigate = useNavigate();
    const paginaInicial = () => navigate("/lancamentofinanceiros/");
    const voltarLogin = () => navigate("/");

    return { paginaInicial, voltarLogin };
}
