import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectService {
  private readonly logger = new Logger('SubjectService');

  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    try {
      const subject = this.subjectRepository.create(createSubjectDto);
      await this.subjectRepository.save(subject);
      return subject;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    try {
      const subjects = await this.subjectRepository.find();
      return subjects;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(codigo: string) {
    try {
      const course = await this.subjectRepository.findOneBy({
        codigo: codigo.toUpperCase(),
      });
      return course;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    // console.log(error)
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
function leftJoinAndSelect(arg0: string, arg1: string) {
  throw new Error('Function not implemented.');
}
