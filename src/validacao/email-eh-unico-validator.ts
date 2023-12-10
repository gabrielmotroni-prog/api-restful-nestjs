import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint,
  //ValidatorOptions,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
/**
 * classe personalizada valida email ja cadastrado
 */
@Injectable()
@ValidatorConstraint({ async: true }) //torna assincrono a validacao
export class EmailUnicoValidator implements ValidatorConstraintInterface {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async validate(
    value: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const usuarioComEmailExistente =
      await this.usuarioRepository.existeComEmail(value);

    //false = acotendeu erro e dispara
    return !usuarioComEmailExistente;
  }
}

/**
 * Decorator valida email de usuario ja cadastrado ou nao
 */

//exportar o Decorator como uma funcao que retorna uma funcao
export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  //para o nosso decorator pegar os parametros do class validator implementados isso
  return (objeto: object, propriedade: string) => {
    //registrar nosso decorator que vai agir sobre o objeto e prorpiedade usando nossa classe EmailUnicoValitor
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailUnicoValidator, // passamos aqui nossa classe validadora
    });
  };
};
