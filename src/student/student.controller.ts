import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/guards/auth.guard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { UserRoleGuard } from 'src/users/guards/roles.guard';

@Controller('student')
@ApiTags('Estudiante')
@ApiBearerAuth()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @UseGuards(JwtAuthGuard)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.studentService.findAll();
  }

  @Get(':cedula')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('cedula') cedula: string) {
    return await this.studentService.findOneByCedula(cedula);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
