import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity('produto_caracteristicas')
export class ProdutoCaracteristicaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'descricao', length: 100, nullable: false })
  descricao: string;

  //explicitar no codigo
  @ManyToOne(() => ProdutoEntity, (produtoEntity) => produtoEntity.id, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE', // ao deletar produto apaga imagem relacionada
    onUpdate: 'CASCADE', // ao atualizar produto atualiza imagem relacionada
  })
  produto: ProdutoEntity;
}
