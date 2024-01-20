import { IsNotEmpty, IsString } from 'class-validator';
import { ProdutoEntity } from '../produto.entity';
export class CaracteristicaProdutoDTO {
  id: string;

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

  produto: ProdutoEntity;
}
