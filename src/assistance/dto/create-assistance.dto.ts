import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { Student } from 'src/student/entities/student.entity';
import { Type } from '../entities/assistance.entity';

export class CreateAssistanceDto {
  @ApiProperty({
    enum: ['Justificada', 'Injustificada'],
    default: 'Injustificada',
  })
  @IsIn(['Justificada', 'Injustificada'])
  inasistencia: Type;

  @ApiProperty()
  @IsOptional()
  estudiante?: Student;
}
