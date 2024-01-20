import { IsNotEmpty, IsString } from 'class-validator';
import { ProdutoEntity } from '../produto.entity';

export class ImagemProdutoDTO {
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'url da imagem não pode ser vazio' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'descricao da imagem não pode ser vazio' })
  descricao: string;

  produto: ProdutoEntity;
}
