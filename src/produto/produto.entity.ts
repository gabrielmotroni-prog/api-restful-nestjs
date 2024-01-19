import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// class ImagemProduto {
//   url: string;
//   descricao: string;
// }

@Entity({ name: 'produtos' })
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'usuario_id', length: 100, nullable: false })
  public usuarioId: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  public nome: string;

  @Column({ name: 'valor', nullable: false })
  public valor: number;

  @Column({ name: 'quantidadeDisponivel', nullable: false })
  public quantidadeDisponivel: number;

  @Column({ name: 'descricao', length: 255, nullable: false })
  public descricao: string;

  @Column({ name: 'categoria', length: 100, nullable: false })
  public categoria: string;

  //public caracteristicas: CaracteristicaProduto[];
  //public imagens: ImagemProduto[];
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
