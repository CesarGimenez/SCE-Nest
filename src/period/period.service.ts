import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { Period } from './entities/period.entity';

@Injectable()
export class PeriodService {
  constructor(
    @InjectRepository(Period)
    private readonly periodRepository: Repository<Period>,
  ) {}
  async create(createPeriodDto: CreatePeriodDto) {
    try {
      const period = this.periodRepository.create(createPeriodDto);
      await this.periodRepository.save(period);
      return period;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      return await this.periodRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(nombre: string) {
    try {
      return await this.periodRepository.findOneBy({ nombre: nombre });
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updatePeriodDto: UpdatePeriodDto) {
    return `This action updates a #${id} period`;
  }

  remove(id: number) {
    return `This action removes a #${id} period`;
  }
}
