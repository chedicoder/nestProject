import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,UpdateDateColumn,DeleteDateColumn } from 'typeorm';

import { StatusEnum } from './todos.enum';

@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // id: string= uuidv4(); si l'id est string on peut utiliser uuidv4 

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({
    update:false
  })
  createdAt: Date;

//updatedAt et deletedAt sont deux champs soient automatiquement gérés par TypeOrm.

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: Date;


  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.IN_PROGRESS })
  status: StatusEnum;


  
}
