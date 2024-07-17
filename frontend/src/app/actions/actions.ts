"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { z } from "zod";

let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {});

export async function novoLancamento(  prevState: {    message: string;  },  formData: FormData,) {
  const dados = {
    lancamentofinanceiro: {
      descricaoLancamento: formData.get('descricao-lancamento'),
      tipoLancamento: formData.get('tipo-lancamento'),
      valorLancamento: formData.get('valor-lancamento'),
      statusLancamento: formData.get('status-lancamento'),
      dataCriacaoLancamento: formData.get('data-criacao-lancamento')
    }
  }
  try {

    const res = await fetch(`https://appfinanceiro.onrender.com/v1/lancamentofinanceiros/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados)

    })
    revalidatePath("/");
    
    return { message: 'ok' };
  } catch (e) {
    return { message: "failed" };
  }
}

export async function deleteTodo(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    id: z.string().min(1),
    todo: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    todo: formData.get("todo"),
  });

  try {
    await fetch(`https://appfinanceiro.onrender.com/v1/lancamentofinanceiros/${data.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    //  const data = await res.json()
    //  return Response.json(data)

    //  await sql`
    //    DELETE FROM todos
    //    WHERE id = ${data.id};
    //  `;

    revalidatePath("/lancamentofinanceiros/");
    return { message: `Deleted todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to delete todo" };
  }
}
