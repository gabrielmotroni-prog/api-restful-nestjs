import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutoRepositoy {
  produtos: ProdutoEntity[] = [];

  async cadastrarProduto(produto: ProdutoEntity) {
    this.produtos.push(produto);
  }

  async listarProdutos() {
    return this.produtos;
  }

  async atualiza(id: string, dadosDeAtualizacao: Partial<ProdutoEntity>) {
    const produto = await this.buscarPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      //nao atualiza id
      if (chave === 'id') {
        return;
      }
      //recebe dados de dadosDeAtualizacao
      produto[chave] = valor;
    });

    return produto;
  }

  async remove(id: string): Promise<ProdutoEntity> {
    const produto = await this.buscarPorId(id);

    //remover da listagem
    this.produtos = this.produtos.filter(
      (produtoSalvo) => produtoSalvo.id !== produto.id,
    );

    return produto;
  }

  private async buscarPorId(id: string) {
    const possivelProduto = this.produtos.find((produto) => produto.id === id);

    if (!possivelProduto) {
      throw new Error('Produto não existe');
    }

    return possivelProduto;
  }
}
