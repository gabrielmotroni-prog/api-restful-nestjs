import { Injectable } from '@nestjs/common';

import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioRepository {
  private buscarPorId(id: string) {
    const possivelUsuario = this.usuarios.find(
      (usuarioSalvo) => usuarioSalvo.id === id,
    );
    if (!possivelUsuario) {
      throw new Error('Usuário não existe');
    }
    return possivelUsuario;
  }

  //array mockado
  private usuarios: UsuarioEntity[] = [];

  async salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  async listar() {
    return this.usuarios;
  }

  async existeComEmail(email: string) {
    const usuario = this.usuarios.find((usuario) => usuario.email === email);

    return usuario != undefined;
  }

  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    const possivelUsuario = this.buscarPorId(id);

    if (!possivelUsuario) {
      throw new Error('usuário não existe');
    }

    //mapear quais chaves de usuario foi passada para atualizar.
    //O quesito de ser do tipo ou não ja foi validado com Partial.
    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      //nao atualzia id
      if (chave === 'id') {
        return;
      }

      //atualiza usuario
      possivelUsuario[chave] = valor;
    });

    return possivelUsuario;
  }

  async remove(id: string) {
    const usuario = this.buscarPorId(id);
    this.usuarios = this.usuarios.filter(
      (usuarioSalvo) => usuarioSalvo.id !== usuario.id,
    );

    return usuario;
  }
}
