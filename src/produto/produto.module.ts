import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoRepositoy } from './produto.repository';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoRepositoy],
})
export class ProdutoModule {}
