import { Module } from '@nestjs/common';
import { UsuarioController } from 'src/usuario/usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { EmailUnicoValidator } from 'src/validacao/email-eh-unico-validator';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioRepository, EmailUnicoValidator],
})
export class UsuarioModule {}
