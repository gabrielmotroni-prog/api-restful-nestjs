class CaracteristicaProduto {
  nome: string;
  descricao: string;
}

class ImagemProduto {
  url: string;
  descricao: string;
}

export class ProdutoEntity {
  public produtoId: string;
  public usuarioId: string;
  public nome: string;
  public valor: number;
  public quantidadeDisponivel: number;
  public descricao: string;
  public caracteristicas: CaracteristicaProduto[];
  public imagens: ImagemProduto[];
  public categoria: string;
  public dataCriacao: string;
  public dataAtualizacao: string;
}
