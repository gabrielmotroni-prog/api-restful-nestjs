import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity('produto_imagens')
export class ProdutoImagemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'url', length: 100, nullable: false })
  url: string;

  @Column({ name: 'descricao', length: 100, nullable: false })
  descricao: string;

  //explicitar no codigo
  @ManyToOne(() => ProdutoEntity, (produtoEntity) => produtoEntity.imagens, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE', // ao deletar produto apaga imagem relacionada
    onUpdate: 'CASCADE', // ao atualizar produto atualiza imagem relacionada
  })
  produto: ProdutoEntity;
}
