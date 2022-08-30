import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from './entities/grade.entity';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
  ) {}
  async create(createGradeDto: CreateGradeDto) {
    try {
      const grade = this.gradeRepository.create(createGradeDto);
      await this.gradeRepository.save(grade);
      return grade;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      const grades = await this.gradeRepository.find();
      return grades;
    } catch (error) {
      console.log(error);
    }
  }

  async findAllByLevel(grado) {
    try {
      const grades = await this.gradeRepository.findBy({ grado: grado });
      return grades;
    } catch (error) {
      console.log(error);
    }
  }

  async findStudentsByLevel(grado) {
    try {
      const grades = await this.gradeRepository.findBy({ grado: grado });
      const array_students = [];
      const students = grades.map((i) => i.estudiantes);
      students.map((i) => i.map((i) => array_students.push(i)));
      return array_students;
    } catch (error) {
      console.log(error);
    }
  }

  async findStudentsForGrade(codigo) {
    try {
      const grade = await this.gradeRepository.findOne({
        where: { codigo: codigo.toUpperCase() },
        relations: ['estudiantes'],
      });
      return grade.estudiantes.filter((i) => i.estatus === 'Activo');
    } catch (error) {}
  }

  async findOne(codigo: string) {
    try {
      const grade = await this.gradeRepository.findOne({
        where: { codigo: codigo.toUpperCase() },
      });
      return grade;
    } catch (error) {}
  }

  update(id: number, updateGradeDto: UpdateGradeDto) {
    return `This action updates a #${id} grade`;
  }

  remove(id: number) {
    return `This action removes a #${id} grade`;
  }
}
