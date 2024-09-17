function filtrarCamposPermitidos<T>(objeto: T, camposPermitidos: Array<keyof T>): Partial<T> {
    const resultado: Partial<T> = {};
    
    for (const campo of camposPermitidos) {
      if (objeto.hasOwnProperty(campo)) {
        resultado[campo] = objeto[campo];
      }
    }
  
    return resultado;
  }

  
  async function executar(usuario: IUsuario): Promise<IUsuario> {
    const resultadoUsuario = await repo.obterPorId(usuario.id);
  
    if (!resultadoUsuario) throw new ServiceErro(USER_NOT_FOUND_ERR);
  
    // Filtrar apenas os campos permitidos
    const usuarioAtualizado = filtrarCamposPermitidos(usuario, ['id', 'nome', 'sobrenome', 'avatar']);
  
    // Agora só os campos filtrados são enviados para o repositório
    return await repo.alterar(usuarioAtualizado);
  }
  