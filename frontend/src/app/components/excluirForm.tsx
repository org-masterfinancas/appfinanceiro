"use client";
 //@ts-ignore
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { excluirLancamento } from '../serverActions/actionsLacamentoFinanceiros';
import { useEffect } from "react";
import { redirect } from "next/navigation";

const initialState = {
  message: "",
};

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button className="bg-red-500 rounded-md p-1 m-2" type="submit" aria-disabled={pending}>
      Excluir 
    </button>
  );
}

export function ExcluirForm({ id }: { id?: string }) {

  const [state, formAction] = useFormState(excluirLancamento, initialState);

  useEffect(() => {
    if (state?.message === 'ok') {
      redirect('/lancamentofinanceiros/');
    }
  }, [state?.message]);
  
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <DeleteButton />
        {state?.message}
    </form>
  )
}
