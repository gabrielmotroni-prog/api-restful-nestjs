import { CaracteristicaProdutoDTO } from './caracteristicaProdutoDTO.dto';
import { ImagemProdutoDTO } from './imagemProdutoDTO.dto';

export class ListarProdutoDTO {
  constructor(
    public produtoId: string,
    public usuarioId: string,
    public nome: string,
    public valor: number,
    public quantidadeDisponivel: number,
    public descricao: string,
    //public caracteristicas: CaracteristicaProdutoDTO[],
    //public imagens: ImagemProdutoDTO[],
    public categoria: string,
    public dataCriacao: string,
    public dataAtualizacao: string,
  ) {}
}
