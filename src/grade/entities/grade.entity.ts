import { Student } from 'src/student/entities/student.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum GradeNames {
  PRIMERO = '1ero',
  SEGUNDO = '2do',
  TERCERO = '3ro',
  CUARTO = '4to',
  QUINTO = '5to',
}

export enum Sections {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
}

@Entity()
export class Grade {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: GradeNames,
    nullable: false,
  })
  grado: GradeNames;

  @Column({
    type: 'enum',
    enum: Sections,
    nullable: false,
  })
  seccion: Sections;

  @Column('text', { unique: true })
  codigo: string;

  @Column('text', { nullable: true })
  profesor_guia: string;

  @OneToMany(() => Student, (student) => student.grado, {
    cascade: true,
    eager: true,
  })
  estudiantes?: Student[];

  // @OneToMany(() => Subject, (subject) => subject.id, {
  //   cascade: true,
  //   eager: true,
  // })
  // cursos?: Subject[];

  @BeforeInsert()
  createCodeGrade() {
    this.codigo = `${this.grado.charAt(0)}${this.seccion}`;
  }
}
