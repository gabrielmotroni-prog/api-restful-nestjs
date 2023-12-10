import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  MaxLength,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CaracteristicaProdutoDTO } from './caracteristicaProdutoDTO.dto';
import { ImagemProdutoDTO } from './imagemProdutoDTO.dto';

export class AtualizarProdutoDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  @IsOptional()
  usuarioId: string;

  // @IsUUID(undefined, { message: 'ID de usuário inválido' })
  // @IsOptional()
  // produtoId: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome do produto não pode ser vazio' })
  @IsOptional()
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
  @IsOptional()
  valor: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, {
    message: 'A quantidade precisa ser um número igual ou maior que zero',
  })
  @IsOptional()
  quantidadeDisponivel: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000, {
    message: 'A descrição não pode ser vazia ou maior que 1000 caracteres',
  })
  @IsOptional()
  descricao: string;

  @ValidateNested()
  @IsArray()
  @Type(() => CaracteristicaProdutoDTO)
  @ArrayMinSize(3, {
    message:
      'A lista de características do produto precisa ter pelo menos 3 itens',
  })
  @IsOptional()
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @Type(() => ImagemProdutoDTO)
  @ArrayMinSize(1, {
    message: 'A lista de imagens do produto precisa ter pelo menos 1 item',
  })
  @IsOptional()
  imagens: ImagemProdutoDTO[];

  @IsNotEmpty({ message: 'A categoria do produto não pode ser vazia' })
  @IsString()
  @IsOptional()
  categoria: string;

  @IsNotEmpty({ message: 'dataCriacao do produto não pode ser vazia' })
  @IsString()
  @IsOptional()
  dataCriacao: string;

  @IsNotEmpty({ message: 'dataAtualizacao do produto não pode ser vazia' })
  @IsString()
  @IsOptional()
  dataAtualizacao: string;
}
