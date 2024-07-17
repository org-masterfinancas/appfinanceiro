"use client";

//@ts-ignore
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { novoLancamento } from "../actions/actions";
import { redirect } from "next/navigation";
import { useEffect } from "react";

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

export function   AdicionarForm() {
  const [state, formAction] = useFormState(novoLancamento, initialState);
  
  useEffect(() => {
    if (state?.message === 'ok') {
      redirect('/')
    }
  }, [state?.message]);
 
  return (
    <form action={formAction}>
      <label htmlFor="descricao">Descrição:</label>
      <input type="text" id="descricao-lancamento" name="descricao-lancamento" required />

      <label htmlFor="valor-lancamento">valor:</label>
      <input type="number" id="valor-lancamento" name="valor-lancamento" required />

      <label htmlFor="tipo-lancamento">Tipo:</label>
      <input type="text" id="tipo-lancamento" name="tipo-lancamento" required />

      <label htmlFor="status-lancamento">Status:</label>
      <input type="text" id="status-lancamento" name="status-lancamento" required />
      
      <label htmlFor="data-criacao-lancamento">Data:</label>
      <input type="date" id="data-criacao-lancamento" name="data-criacao-lancamento" required />
      <br/>
      <SubmitButton />
      <p>
        {state?.message}
      </p>
    </form>
  );
}

