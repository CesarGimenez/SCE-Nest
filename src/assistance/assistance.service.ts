import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssistanceDto } from './dto/create-assistance.dto';
import { UpdateAssistanceDto } from './dto/update-assistance.dto';
import { Assistance } from './entities/assistance.entity';

@Injectable()
export class AssistanceService {
  constructor(
    @InjectRepository(Assistance)
    private readonly assitanceRepository: Repository<Assistance>,
  ) {}
  async create(createAssistanceDto: CreateAssistanceDto) {
    try {
      const inassistance = this.assitanceRepository.create(createAssistanceDto);
      await this.assitanceRepository.save(inassistance);
      return inassistance;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      await this.assitanceRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} assistance`;
  }

  update(id: number, updateAssistanceDto: UpdateAssistanceDto) {
    return `This action updates a #${id} assistance`;
  }

  remove(id: number) {
    return `This action removes a #${id} assistance`;
  }
}
