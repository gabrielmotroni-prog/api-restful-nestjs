import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutoRepositoy } from './produto.repository';
import { CriarProdutoDTO } from './dto/criarProduto.dto';
import { ProdutoEntity } from './produto.entity';

import { v4 as uuidv4 } from 'uuid';
import { AtualizarProdutoDTO } from './dto/atualizarProduto.dto';
import { ListarProdutoDTO } from './dto/listarProduto.dto';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepositoy: ProdutoRepositoy) {}

  @Post()
  async cadastrarProduto(@Body() dadosProduto: CriarProdutoDTO) {
    // dadosProduto foram validados pelo DTO
    const produtoEntity = new ProdutoEntity();
    produtoEntity.id = uuidv4();
    produtoEntity.usuarioId = dadosProduto.usuarioId;
    produtoEntity.nome = dadosProduto.nome;
    produtoEntity.valor = dadosProduto.valor;
    produtoEntity.quantidadeDisponivel = dadosProduto.quantidadeDisponivel;
    produtoEntity.descricao = dadosProduto.descricao;
    //produtoEntity.caracteristicas = dadosProduto.caracteristicas;
    //produtoEntity.imagens = dadosProduto.imagens;
    produtoEntity.categoria = dadosProduto.categoria;
    produtoEntity.createdAt = dadosProduto.dataCriacao;
    produtoEntity.updatedAt = dadosProduto.dataAtualizacao;

    await this.produtoRepositoy.cadastrarProduto(produtoEntity);

    return {
      message: 'produto criado',
      produto: new ListarProdutoDTO(
        produtoEntity.id,
        produtoEntity.usuarioId,
        produtoEntity.nome,
        produtoEntity.valor,
        produtoEntity.quantidadeDisponivel,
        produtoEntity.descricao,
        //produtoEntity.caracteristicas,
        //produtoEntity.imagens,
        produtoEntity.categoria,
        produtoEntity.createdAt,
        produtoEntity.updatedAt,
      ),
    };
  }

  @Get()
  async listarProdutos() {
    const produtosSalvos = await this.produtoRepositoy.listarProdutos();

    const produtoLista = produtosSalvos.map(
      (produto) =>
        new ListarProdutoDTO(
          produto.id,
          produto.usuarioId,
          produto.nome,
          produto.valor,
          produto.quantidadeDisponivel,
          produto.descricao,
          //produto.caracteristicas,
          //produto.imagens,
          produto.categoria,
          produto.createdAt,
          produto.updatedAt,
        ),
    );
    return produtoLista;
  }

  @Put('/:id')
  async atualizarPrduto(
    @Param('id') id: string,
    @Body() novosDados: AtualizarProdutoDTO,
  ) {
    //novosDados dados validados
    try {
      const produtoAtualizado = await this.produtoRepositoy.atualiza(
        id,
        novosDados,
      );

      return {
        message: 'produto atualizado',
        produto: new ListarProdutoDTO(
          produtoAtualizado.id,
          produtoAtualizado.usuarioId,
          produtoAtualizado.nome,
          produtoAtualizado.valor,
          produtoAtualizado.quantidadeDisponivel,
          produtoAtualizado.descricao,
          //produtoAtualizado.caracteristicas,
          //produtoAtualizado.imagens,
          produtoAtualizado.categoria,
          produtoAtualizado.createdAt,
          produtoAtualizado.updatedAt,
        ),
      };
    } catch (error) {
      return { message: 'erro ao tentar atualizar produto' };
    }
  }

  @Delete('/:id')
  async removeProduto(@Param('id') id: string) {
    try {
      const produtoDeletado = await this.produtoRepositoy.remove(id);

      return {
        message: 'produto removido',
        produto: new ListarProdutoDTO(
          produtoDeletado.id,
          produtoDeletado.usuarioId,
          produtoDeletado.nome,
          produtoDeletado.valor,
          produtoDeletado.quantidadeDisponivel,
          produtoDeletado.descricao,
          //produtoDeletado.caracteristicas,
          //produtoDeletado.imagens,
          produtoDeletado.categoria,
          produtoDeletado.createdAt,
          produtoDeletado.updatedAt,
        ),
      };
    } catch (error) {
      return {
        message: 'erro ao tentar deletar produto',
        error: error.message,
      };
    }
  }
}
