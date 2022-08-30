import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';
import { Student } from 'src/student/entities/student.entity';
import { GradeNames, Sections } from '../entities/grade.entity';

export class CreateGradeDto {
  @ApiProperty({ enum: ['1ero', '2do', '3ro', '4to', '5to'] })
  @IsIn(['1ero', '2do', '3ero', '4to', '5to'])
  grado: GradeNames;

  @ApiProperty({ enum: ['A', 'B', 'C', 'D', 'E', 'F'] })
  @IsIn(['A', 'B', 'C', 'D', 'E', 'F'])
  seccion: Sections;

  codigo?: string;

  @IsOptional()
  @IsString()
  profesor_guia?: string;

  @IsArray()
  @IsOptional()
  estudiantes?: Student[];
}
