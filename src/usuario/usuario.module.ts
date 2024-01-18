import { Module } from '@nestjs/common';
import { UsuarioController } from 'src/usuario/usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { EmailUnicoValidator } from 'src/validacao/email-eh-unico-validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Module({
  //informando ao modulo que contem essa entidade
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository, EmailUnicoValidator],
})
export class UsuarioModule {}
