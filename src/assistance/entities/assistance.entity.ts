import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export type Type = 'Justificada' | 'Injustificada';

@Entity()
export class Assistance {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: ['Injustificada', 'Justificada'],
  })
  inasistencia: Type;

  @Column({
    type: 'enum',
    enum: ['Injustificada', 'Justificada'],
    nullable: true,
  })
  impuntualidad?: Type;

  @Column('timestamp', { default: new Date() })
  fecha_inasistencia: Date;

  @ManyToOne(() => Student, (student) => student.inasistencias, {
    onDelete: 'CASCADE',
  })
  estudiante: Student;
}
