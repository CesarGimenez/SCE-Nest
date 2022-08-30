import { Period } from 'src/period/entities/period.entity';
import { Student } from 'src/student/entities/student.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Qualification {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('float', { nullable: true, default: 0 })
  momento_1: number;

  @Column('float', { nullable: true, default: 0 })
  momento_2: number;

  @Column('float', { nullable: true, default: 0 })
  momento_3: number;

  @Column('float', { nullable: true, default: 0 })
  promedio: number;

  @ManyToOne(() => Subject, (subject) => subject.calificaciones, {
    onDelete: 'CASCADE',
  })
  materia: Subject;

  @ManyToOne(() => Student, (student) => student.calificaciones, {
    onDelete: 'CASCADE',
  })
  estudiante: Student;

  // @ManyToOne(() => Period, (period) => period.id, {
  //   onDelete: 'CASCADE',
  // })
  // periodo?: Period;

  @BeforeInsert()
  createAverage() {
    if (this.momento_3 <= 0 && this.momento_2 <= 0) {
      this.promedio = this.momento_1;
    } else if (this.momento_3 <= 0 && this.momento_2 > 0) {
      this.promedio = this.momento_1 + this.momento_2 / 2;
    } else if (this.momento_3 > 0 && this.momento_2 > 0) {
      this.promedio = this.momento_1 + this.momento_2 + this.momento_3 / 3;
    }
  }

  @BeforeUpdate()
  updateAverage() {
    if (this.momento_3 <= 0 && this.momento_2 <= 0) {
      this.promedio = this.momento_1;
    } else if (this.momento_3 <= 0 && this.momento_2 > 0) {
      this.promedio = this.momento_1 + this.momento_2 / 2;
    } else if (this.momento_3 > 0 && this.momento_2 > 0) {
      this.promedio = this.momento_1 + this.momento_2 + this.momento_3 / 3;
    }
  }
}
