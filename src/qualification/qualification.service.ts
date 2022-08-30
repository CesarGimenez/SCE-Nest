import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQualificationDto } from './dto/create-qualification.dto';
import { UpdateQualificationDto } from './dto/update-qualification.dto';
import { Qualification } from './entities/qualification.entity';

@Injectable()
export class QualificationService {
  constructor(
    @InjectRepository(Qualification)
    private readonly qualificationRepository: Repository<Qualification>,
  ) {}
  async create(createQualificationDto: CreateQualificationDto) {
    try {
      const qualification = this.qualificationRepository.create(
        createQualificationDto,
      );
      await this.qualificationRepository.save(qualification);
      return qualification;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      const qualifications = await this.qualificationRepository.find({
        relations: ['estudiante', 'materia'],
      });
      return qualifications;
    } catch (error) {
      console.log(error);
    }
  }

  async findBests() {
    try {
      const qualifications = await this.qualificationRepository.find({
        order: { promedio: 'DESC' },
        relations: ['estudiante'],
      });
      return qualifications;
    } catch (error) {
      console.log(error);
    }
  }

  async findBestsByGrade() {
    try {
      const qualifications = await this.qualificationRepository.find({
        order: { promedio: 'DESC' },
        relations: ['estudiante'],
      });
      return qualifications;
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} qualification`;
  }

  update(id: number, updateQualificationDto: UpdateQualificationDto) {
    return `This action updates a #${id} qualification`;
  }

  remove(id: number) {
    return `This action removes a #${id} qualification`;
  }
}
