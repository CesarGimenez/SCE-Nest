import { Subject } from 'src/subject/entities/subject.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'profesor',
  OTHER = 'otro',
}

export type UserGender = 'Masculino' | 'Femenino';

export type UserStatus = 'Activo' | 'Inactivo';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { unique: true, nullable: false })
  cedula: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.OTHER,
  })
  rol: UserRole;

  @Column('text', { nullable: false })
  nombre: string;

  @Column('text', { nullable: false })
  apellido: string;

  @Column('text', { nullable: true })
  telefono?: string;

  @Column({
    type: 'enum',
    enum: ['Activo', 'Inactivo'],
    default: 'Activo',
  })
  estatus: UserStatus;

  @Column({
    type: 'enum',
    enum: ['Masculino', 'Femenino'],
  })
  genero: UserGender;

  @Column('timestamp', { default: new Date() })
  fecha_creacion: Date;

  @Column('timestamp')
  fecha_modificacion: Date;

  @Column('text')
  modificado_por: string;

  @Column('text', { unique: true, nullable: false })
  correo: string;

  @Column('text', { nullable: false, select: false })
  password: string;

  @OneToMany(() => Subject, (subject) => subject.id, { onDelete: 'CASCADE' })
  materias: Subject[];

  @BeforeInsert()
  emailLowerCase() {
    this.correo = this.correo.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.emailLowerCase();
  }
}
