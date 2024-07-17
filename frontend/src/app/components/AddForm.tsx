"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { novoLancamento } from "../actions/actions";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import formatarData from "@/lib/datas";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Inserir Lançamento
    </button>
  );
}

interface AddFormProps {
  lancamento?: {
    descricaoLancamento: string;
    valorLancamento: string;
    tipoLancamento: string;
    statusLancamento: string;
    dataCriacaoLancamento: string;
  };
}

export default async function AddForm({ lancamento }: AddFormProps) {
  const [state, formAction] = useFormState(novoLancamento, initialState);

  useEffect(() => {
    if (state?.message === 'ok') {
      redirect('/')
    }
  }, [state?.message]);

  return (
    <form action={formAction}>
      <label htmlFor="descricao">Descrição:</label>
      <input
        type="text"
        id="descricao-lancamento"
        name="descricao-lancamento"
        required
        defaultValue={lancamento?.descricaoLancamento}
        readOnly={!!lancamento}
      />

      <label htmlFor="valor-lancamento">Valor:</label>
      <input
        type="number"
        id="valor-lancamento"
        name="valor-lancamento"
        required
        defaultValue={lancamento?.valorLancamento}
        readOnly={!!lancamento}
      />

      <label htmlFor="tipo-lancamento">Tipo:</label>
      <input
        type="text"
        id="tipo-lancamento"
        name="tipo-lancamento"
        required
        defaultValue={lancamento?.tipoLancamento}
        readOnly={!!lancamento}
      />

      <label htmlFor="status-lancamento">Status:</label>
      <input
        type="text"
        id="status-lancamento"
        name="status-lancamento"
        required
        defaultValue={lancamento?.statusLancamento}
        readOnly={!!lancamento}
      />

      <label htmlFor="data-criacao-lancamento">Data:</label>
      <input
        type="date"
        id="data-criacao-lancamento"
        name="data-criacao-lancamento"
        required
        defaultValue={lancamento?.dataCriacaoLancamento.toString()}
        readOnly={!!lancamento}
      />
      <br/>
      {!lancamento && <SubmitButton />}
      <p>
        {state?.message}
      </p>
    </form>
  );
}
