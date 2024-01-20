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
import { ProdutoService } from './produto.service';

@Controller('/produtos')
export class ProdutoController {
  constructor(
    private readonly produtoRepositoy: ProdutoRepositoy,
    private readonly produtoService: ProdutoService,
  ) {}

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
    produtoEntity.caracteristicas = dadosProduto.caracteristicas;
    produtoEntity.imagens = dadosProduto.imagens;
    produtoEntity.categoria = dadosProduto.categoria;
    produtoEntity.createdAt = dadosProduto.dataCriacao;
    produtoEntity.updatedAt = dadosProduto.dataAtualizacao;

    await this.produtoService.criaProduto(produtoEntity);

    return {
      message: 'produto criado',
      produto: new ListarProdutoDTO(
        produtoEntity.id,
        produtoEntity.usuarioId,
        produtoEntity.nome,
        produtoEntity.valor,
        produtoEntity.quantidadeDisponivel,
        produtoEntity.descricao,
        produtoEntity.caracteristicas,
        produtoEntity.imagens,
        produtoEntity.categoria,
        produtoEntity.createdAt,
        produtoEntity.updatedAt,
      ),
    };
  }

  @Get()
  async listarProdutos() {
    const produtoLista = await this.produtoService.listaProduto();

    return produtoLista;
  }

  @Put('/:id')
  async atualizarPrduto(
    @Param('id') id: string,
    @Body() novosDados: AtualizarProdutoDTO,
  ) {
    //novosDados dados já validados
    try {
      await this.produtoService.atualizaProduto(id, novosDados);

      return {
        message: 'produto atualizado',
        id: id,
      };
    } catch (error) {
      return {
        message: 'erro ao tentar atualizar produto',
        error: error.message,
      };
    }
  }

  @Delete('/:id')
  async removeProduto(@Param('id') id: string) {
    try {
      await this.produtoService.deletarProduto(id);

      return {
        message: 'produto removido',
        id: id,
      };
    } catch (error) {
      console.log(error);
      return {
        message: 'erro ao tentar deletar produto',
        error: error.message,
      };
    }
  }
}
