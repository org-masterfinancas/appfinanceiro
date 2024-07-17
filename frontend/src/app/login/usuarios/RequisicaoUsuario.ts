
export async function loginApi(formData: FormData): Promise<any> {

  const usuario = { email: formData.get('email'), senha: formData.get('senha') }
  const res = await fetch('https://appfinanceiro.onrender.com/login', {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(usuario),
  })
  if (res.status === 200) {
    return res
  } else {
    return false
  }

}



