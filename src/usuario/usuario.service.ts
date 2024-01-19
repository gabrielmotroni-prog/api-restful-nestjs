/**
 * 		Criaremos o service (serviço) com duas "responsabilidades",     entre aspas:
		1. Abstrair algumas responsabilidades do controlador, tirando essas responsabilidades do controller;
		2. Criar o repository pattern dentro do usuario.service.ts, apontando para nossa entidade de usuário.

 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/listaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { AtualizarUsuarioDTO } from './dto/atualizarUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    //criando repositorio em cima de uma entidade existente acessivel por usuarioReposity
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(usuarioEntity: UsuarioEntity) {
    await this.usuarioRepository.save(usuarioEntity);
  }

  async listaUsuarios() {
    const usuarioSalvos = await this.usuarioRepository.find();
    //mapeia para DTO
    const usuariosLista = usuarioSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );

    return usuariosLista;
  }

  async atualizaUsuario(
    id: string,
    usuarioEntity: Partial<AtualizarUsuarioDTO>,
  ) {
    const possivelUsuario = await this.buscarPorId(id);

    if (!possivelUsuario) {
      throw new Error('usuário não existe');
    }

    // Mapear quais chaves de usuario foi passada para atualizar.
    // O quesito de ser do tipo ou não ja foi validado com Partial.
    Object.entries(usuarioEntity).forEach(([chave, valor]) => {
      //nao atualiza id
      if (chave === 'id') {
        return;
      }

      //atualiza usuario
      possivelUsuario[chave] = valor;
    });

    await this.usuarioRepository.update(id, possivelUsuario);
  }

  async deletaUsuario(id: string) {
    const possivelUsuario = await this.buscarPorId(id);

    if (!possivelUsuario) {
      throw new Error('usuário não existe');
    }

    await this.usuarioRepository.delete(id);
  }

  private async buscarPorId(id: string) {
    const possivelUsuario = await this.usuarioRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!possivelUsuario) {
      throw new Error('Usuário não existe');
    }
    return possivelUsuario;
  }
}
