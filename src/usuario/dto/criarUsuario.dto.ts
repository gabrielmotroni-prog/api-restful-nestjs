import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { EmailEhUnico } from 'src/validacao/email-eh-unico-validator';

export class CriarUsuarioDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailEhUnico({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @MinLength(6, { message: 'A sxnha precisa ter pelo menos 6 caracteres' })
  senha: string;
}
