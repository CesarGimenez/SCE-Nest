import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Grade } from 'src/grade/entities/grade.entity';
import { Qualification } from 'src/qualification/entities/qualification.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateSubjectDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  descripcion: string;

  @ApiProperty({ type: [Qualification] })
  calificaciones?: Qualification[];

  //   @ApiProperty({ type: Grade })
  //   grado?: Grade;

  // @ApiProperty({ type: User })
  // docente?: User;
}
