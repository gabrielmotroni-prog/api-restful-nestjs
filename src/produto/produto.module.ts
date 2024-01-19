import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoRepositoy } from './produto.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { ProdutoService } from './produto.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity])],
  controllers: [ProdutoController],
  providers: [ProdutoRepositoy, ProdutoService],
})
export class ProdutoModule {}
