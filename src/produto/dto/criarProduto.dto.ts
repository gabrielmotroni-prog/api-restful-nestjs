import {
  IsNotEmpty,
  IsArray,
  IsNumber,
  ValidateNested,
  MaxLength,
  Min,
  ArrayMinSize,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CaracteristicaProdutoDTO } from './caracteristicaProdutoDTO.dto';
import { ImagemProdutoDTO } from './imagemProdutoDTO.dto';

export class CriarProdutoDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuarioId: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome do produto não pode ser vazio' })
  nome: string;

  @IsNotEmpty()
  @IsNumber(
    {
      maxDecimalPlaces: 2,
      allowNaN: false,
      allowInfinity: false,
    },
    {
      message:
        'O valor do produto precisa ser um número positivo (não pode ser zero) e ter até duas casas decimais',
    },
  )
  @Min(0.1, {
    message:
      'O valor do produto precisa ser um número positivo (não pode ser zero) e ter até duas casas decimais',
  })
  valor: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, {
    message: 'A quantidade precisa ser um número igual ou maior que zero',
  })
  quantidadeDisponivel: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000, {
    message: 'A descrição não pode ser vazia ou maior que 1000 caracteres',
  })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @Type(() => CaracteristicaProdutoDTO)
  @ArrayMinSize(3, {
    message:
      'A lista de características do produto precisa ter pelo menos 3 itens',
  })
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @Type(() => ImagemProdutoDTO)
  @ArrayMinSize(1, {
    message: 'A lista de imagens do produto precisa ter pelo menos 1 item',
  })
  imagens: ImagemProdutoDTO[];

  @IsNotEmpty({ message: 'A categoria do produto não pode ser vazia' })
  @IsString()
  categoria: string;

  @IsNotEmpty({ message: 'dataCriacao do produto não pode ser vazia' })
  @IsString()
  dataCriacao: string;

  @IsNotEmpty({ message: 'dataAtualizacao do produto não pode ser vazia' })
  @IsString()
  dataAtualizacao: string;
}
