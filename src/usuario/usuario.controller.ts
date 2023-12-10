import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriarUsuarioDTO } from './dto/criarUsuario.dto';
import { v4 as uuidv4 } from 'uuid';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { ListaUsuarioDTO } from './dto/listaUsuario.dto';
import { AtualizarUsuarioDTO } from './dto/atualizarUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriarUsuarioDTO) {
    // dadosDoUsuario foram validados pelo DTO
    const usuarioEntity = new UsuarioEntity();

    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.id = uuidv4(); // gera uuid

    await this.usuarioRepository.salvar(usuarioEntity);

    return {
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      message: 'usuário criado com sucesso',
    };
  }
  @Get()
  async listarUsuario() {
    const usuariosSalvos = await this.usuarioRepository.listar();

    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );

    return usuariosLista;
  }

  @Put('/:id')
  async atualizaUsuarioasunc(
    @Param('id') id: string,
    @Body() novosDados: AtualizarUsuarioDTO,
  ) {
    try {
      const usuarioAtualizado = await this.usuarioRepository.atualiza(
        id,
        novosDados,
      );

      return {
        usuario: new ListaUsuarioDTO(
          usuarioAtualizado.id,
          usuarioAtualizado.nome,
        ),
        message: 'usuário atualizado',
      };
    } catch (error) {
      return {
        error: error.message,
        message: 'erro ao tentar atualizar usuario',
      };
    }
  }
  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    try {
      const usuarioRemovido = await this.usuarioRepository.remove(id);

      return {
        usuario: new ListaUsuarioDTO(usuarioRemovido.id, usuarioRemovido.nome),
        message: 'usuário removido com sucesso',
      };
    } catch (error) {
      return {
        error: error.message,
        message: 'erro ao tentar deletar usuario',
      };
    }
  }
}
