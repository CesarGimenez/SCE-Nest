import { Assistance } from 'src/assistance/entities/assistance.entity';
import { Grade } from 'src/grade/entities/grade.entity';
import { Qualification } from 'src/qualification/entities/qualification.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type StudentStatus = 'Activo' | 'Inactivo';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { unique: true })
  codigo: string;

  @Column('text', { unique: true, nullable: false })
  cedula: string;

  @Column('text', { nullable: false })
  nombre: string;

  @Column('text', { nullable: false })
  apellido: string;

  @Column({
    type: 'enum',
    enum: ['Activo', 'Inactivo'],
    default: 'Activo',
  })
  estatus: StudentStatus;

  @Column('timestamp')
  fecha_nacimiento?: Date;

  @Column('text', { nullable: true })
  lugar_nacimiento: string;

  @Column('text', { nullable: true })
  estado_nacimiento: string;

  @Column('text', { nullable: true })
  municipio_nacimiento: string;

  @Column('text')
  pais_nacimiento: string;

  @Column('float', { nullable: true })
  altura: number;

  @Column('float', { nullable: true })
  peso: number;

  @Column('text', { nullable: true })
  telefono: string;

  @Column('text', { nullable: true })
  correo: string;

  @ManyToOne(() => Grade, (grade) => grade.estudiantes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_grado' })
  grado: Grade;

  @OneToMany(() => Qualification, (qualification) => qualification.estudiante, {
    cascade: true,
    eager: true,
  })
  calificaciones: Qualification[];

  @OneToMany(() => Assistance, (assitance) => assitance.estudiante, {
    cascade: true,
    eager: true,
  })
  inasistencias: Assistance[];

  @BeforeInsert()
  CreateStudentCode() {
    this.codigo =
      this.nombre.charAt(0).toUpperCase() +
      this.apellido.charAt(0).toUpperCase() +
      this.cedula.toUpperCase().replace('-', '');
  }
}
