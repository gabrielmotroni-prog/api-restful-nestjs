import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { ListarProdutoDTO } from './dto/listarProduto.dto';
import { AtualizarProdutoDTO } from './dto/atualizarProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoReposity: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(produtoEntity: ProdutoEntity) {
    await this.produtoReposity.save(produtoEntity);
  }

  async listaProduto(): Promise<ListarProdutoDTO[]> {
    const produtosSalvos = await this.produtoReposity.find();

    const produtosSalvosDTO = produtosSalvos.map(
      (produto) =>
        new ListarProdutoDTO(
          produto.id,
          produto.usuarioId,
          produto.nome,
          produto.valor,
          produto.quantidadeDisponivel,
          produto.descricao,
          produto.categoria,
          produto.createdAt,
          produto.updatedAt,
        ),
    );
    return produtosSalvosDTO;
  }

  async atualizaProduto(
    id: string,
    produtoEntity: Partial<AtualizarProdutoDTO>,
  ) {
    const possivelProduto = await this.buscarPorId(id);

    if (!possivelProduto) {
      throw new Error('produto não existe');
    }

    // Mapear quais chaves de usuario foi passada para atualizar.
    // O quesito de ser do tipo ou não ja foi validado com Partial.
    Object.entries(produtoEntity).forEach(([chave, valor]) => {
      //não atualiza id
      if (chave === 'id') {
        return;
      }
      //atualiza objeto com novas propriedades
      possivelProduto[chave] = valor;
    });

    await this.produtoReposity.update(id, possivelProduto);
  }

  async deletarProduto(id: string) {
    const possivelProduto = await this.buscarPorId(id);

    if (!possivelProduto) {
      throw new Error('Produto não existe');
    }
    await this.produtoReposity.delete(id);
  }

  private async buscarPorId(id: string) {
    try {
      const possivelProduto = await this.produtoReposity.findOne({
        where: {
          id: id,
        },
      });

      if (!possivelProduto) {
        throw new Error('Produto não existe');
      }

      return possivelProduto;
    } catch (error) {
      throw new Error(error?.message ?? 'Erro ao tentar buscar por usuário');
    }
  }
}
