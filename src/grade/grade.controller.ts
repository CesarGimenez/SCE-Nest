import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GradeNames } from './entities/grade.entity';
import { JwtAuthGuard } from 'src/users/guards/auth.guard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { UserRoleGuard } from 'src/users/guards/roles.guard';

@Controller('grade')
@ApiTags('Grado')
@ApiBearerAuth()
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @ApiBody({ type: CreateGradeDto })
  async create(@Body() createGradeDto: CreateGradeDto) {
    return await this.gradeService.create(createGradeDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  async findAll() {
    return await this.gradeService.findAll();
  }

  @Get('/filter-level')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @ApiQuery({ name: 'Grado', enum: GradeNames })
  async findAllByLevel(@Query('Grado') grado: GradeNames = GradeNames.PRIMERO) {
    return await this.gradeService.findAllByLevel(grado);
  }

  @Get('/filter-level/students')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @ApiQuery({ name: 'Grado', enum: GradeNames })
  async findStudentsByLevel(
    @Query('Grado') grado: GradeNames = GradeNames.PRIMERO,
  ) {
    return await this.gradeService.findStudentsByLevel(grado);
  }

  @Get('students/:codigo')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @ApiParam({ name: 'codigo' })
  async findStudentsByGrade(@Param('codigo') codigo: string) {
    return await this.gradeService.findStudentsForGrade(codigo);
  }

  @Get(':codigo')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  async findOne(@Param('codigo') codigo: string) {
    return await this.gradeService.findOne(codigo);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradeService.update(+id, updateGradeDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  remove(@Param('id') id: string) {
    return this.gradeService.remove(+id);
  }
}
