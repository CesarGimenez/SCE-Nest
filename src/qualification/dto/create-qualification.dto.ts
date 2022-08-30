import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Student } from 'src/student/entities/student.entity';
import { Qualification } from '../entities/qualification.entity';

export class CreateQualificationDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  momento_1: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  momento_2: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  momento_3: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  promedio: number;

  @ApiProperty()
  @IsOptional()
  estudiante?: Student;

  @ApiProperty()
  @IsOptional()
  materia?: Qualification;
}
