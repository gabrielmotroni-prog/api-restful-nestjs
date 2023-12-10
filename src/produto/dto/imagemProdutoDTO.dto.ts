import { IsNotEmpty, IsString } from 'class-validator';

export class ImagemProdutoDTO {
  @IsString()
  @IsNotEmpty({ message: 'url da imagem não pode ser vazio' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'descricao da imagem não pode ser vazio' })
  descricao: string;
}
