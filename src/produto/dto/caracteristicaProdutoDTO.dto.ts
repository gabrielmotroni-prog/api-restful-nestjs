import { IsNotEmpty, IsString } from 'class-validator';
export class CaracteristicaProdutoDTO {
  @IsString({
    message: 'message da caracterisca do produto deve ser um texto',
  })
  @IsNotEmpty({ message: 'nome da caracterisca do produto não pode ser vazio' })
  nome: string;

  @IsString({
    message: 'message da caracterisca do produto deve ser um texto',
  })
  @IsNotEmpty({
    message: 'descricao da caracterisca do produto não pode ser vazio',
  })
  descricao: string;
}
