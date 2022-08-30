import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Grade } from 'src/grade/entities/grade.entity';
import { StudentStatus } from '../entities/student.entity';

export class CreateStudentDto {
  @ApiProperty()
  @IsString()
  codigo: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  cedula: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  apellido: string;

  @ApiProperty({ enum: ['Activo', 'Inactivo'], default: 'Activo' })
  @IsIn(['Activo', 'Inactivo'])
  estatus: StudentStatus;

  @IsNotEmpty()
  @ApiProperty()
  fecha_nacimiento: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lugar_nacimiento?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  estado_nacimiento?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  municipio_nacimiento?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  pais_nacimiento?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  altura?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  peso?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  correo?: string;

  @ApiProperty()
  @IsOptional()
  grado?: Grade;
}
