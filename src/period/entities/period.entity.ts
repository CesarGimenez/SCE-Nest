import { Qualification } from 'src/qualification/entities/qualification.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Period {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { unique: true })
  nombre: string;

  // @OneToMany(() => Qualification, (qualification) => qualification.id, {
  //   onDelete: 'CASCADE',
  // })
  // notas?: Qualification[];

  @BeforeInsert()
  CreatePeriodName() {
    this.nombre = `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`;
  }
}
