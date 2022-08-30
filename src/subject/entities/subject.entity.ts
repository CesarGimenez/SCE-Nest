import { Grade } from 'src/grade/entities/grade.entity';
import { Qualification } from 'src/qualification/entities/qualification.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { unique: true })
  codigo: string;

  @Column('text', { nullable: false, unique: true })
  nombre: string;

  @Column('text', { nullable: true })
  descripcion: string;

  @OneToMany(() => Qualification, (qualification) => qualification.materia, {
    cascade: true,
    eager: true,
  })
  calificaciones?: Qualification[];

  // @ManyToOne(() => Grade, (grade) => grade.id, {
  //   cascade: true,
  //   eager: true,
  // })
  // grado?: Grade;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    eager: true,
  })
  docente?: User;
}
