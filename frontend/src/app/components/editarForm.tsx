"use client";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { atualizarLancamento, excluirLancamento } from "../serverActions/actionsLacamentoFinanceiros";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { LancamentoFinanceiro } from "../data/model/lancamentoFinanceiro";
import { formatDate } from "@/app/Utils/utilsdata";
import { ExcluirForm } from "./excluirForm";
import BotaoLink from "./BotaoLInk";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="bg-green-500 rounded-md p-1 m-2" type="submit" aria-disabled={pending}>
      Salvar
    </button>
  );
}


interface AddFormProps {
  lancamento?: LancamentoFinanceiro;
}

export default function EditarForm({ lancamento }: AddFormProps) {
  let edicao = true
  const [state, formAction] = useFormState(atualizarLancamento, initialState)
  const [editar, setEditar] = useState(edicao)
  const [useDefaultValue, setUseDefaultValue] = useState(!edicao)

  useEffect(() => {
    if (state?.message === 'ok') {
      redirect('/lancamentofinanceiros/');
    }
  }, [state?.message]);

  const toggleEditar = () => {
    setEditar((prevEditar) => !prevEditar);
    setUseDefaultValue((prevUseDefaultValue) => !prevUseDefaultValue);
  };

  return (
    <div>
      <div>
        <button className="bg-orange-500 rounded-md p-1 m-2" type="button" onClick={toggleEditar}>
          {editar ? "Editar" : "Cancelar Edição"}
        </button>
      </div>
      <form action={formAction}>
        <input
          type="hidden"
          id="id"
          name="id"
          value={lancamento?.id}
        />
        <label htmlFor="descricao">Descrição:</label>
        <input
          type="text"
          id="descricao-lancamento"
          name="descricao-lancamento"
          required
          {...(useDefaultValue
            ? { defaultValue: lancamento?.descricaoLancamento }
            : { value: lancamento?.descricaoLancamento })}
          readOnly={editar}
        />

        <label htmlFor="valor-lancamento">Valor:</label>
        <input
          type="number"
          id="valor-lancamento"
          name="valor-lancamento"
          required
          {...(useDefaultValue
            ? { defaultValue: lancamento?.valorLancamento }
            : { value: lancamento?.valorLancamento })}
          readOnly={editar}
        />

        <label htmlFor="tipo-lancamento">Tipo:</label>
        <input
          type="text"
          id="tipo-lancamento"
          name="tipo-lancamento"
          required
          {...(useDefaultValue
            ? { defaultValue: lancamento?.tipoLancamento }
            : { value: lancamento?.tipoLancamento })}
          readOnly={editar}
        />

        <label htmlFor="status-lancamento">Status:</label>
        <input
          type="text"
          id="status-lancamento"
          name="status-lancamento"
          required
          {...(useDefaultValue
            ? { defaultValue: lancamento?.statusLancamento }
            : { value: lancamento?.statusLancamento })}
          readOnly={editar}
        />

        <label htmlFor="data-criacao-lancamento">Data:</label>
        <input
          type="date"
          id="data-criacao-lancamento"
          name="data-criacao-lancamento"
          required
          {...(useDefaultValue
            ? { defaultValue: lancamento ? formatDate(lancamento.dataCriacaoLancamento) : "" }
            : { value: lancamento ? formatDate(lancamento.dataCriacaoLancamento) : "" })}
          readOnly={editar}
        />
        <div>
          {!editar && <SubmitButton />}
          {state?.message}
        </div>
      </form>
      {!editar && <ExcluirForm id={lancamento?.id} />}
    </div>
  );
}
