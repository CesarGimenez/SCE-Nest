import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Subject } from 'src/subject/entities/subject.entity';
import { UserGender, UserRole, UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cedula: string;

  @ApiProperty({ enum: ['admin', 'profesor', 'otro'] })
  @IsIn(['admin', 'profesor', 'otro'])
  rol: UserRole;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty()
  @IsString()
  @Optional()
  telefono?: string;

  @ApiProperty({ enum: ['Activo', 'Inactivo'], default: 'Activo' })
  @IsIn(['Activo', 'Inactivo'])
  estatus: UserStatus;

  @ApiProperty({ enum: ['Masculino', 'Femenino'] })
  @IsIn(['Masculino', 'Femenino'])
  genero: UserGender;

  @ApiProperty({ default: new Date() })
  fecha_creacion: Date;

  @ApiProperty()
  @IsOptional()
  fecha_modificacion?: Date;

  @ApiProperty()
  @IsOptional()
  modificado_por?: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  // @ApiProperty({ type: [Subject] })
  // materias?: Subject[];
}
