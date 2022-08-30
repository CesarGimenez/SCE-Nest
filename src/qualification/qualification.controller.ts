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
import { QualificationService } from './qualification.service';
import { CreateQualificationDto } from './dto/create-qualification.dto';
import { UpdateQualificationDto } from './dto/update-qualification.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/guards/auth.guard';
import { UserRole } from 'src/users/entities/user.entity';
import { Roles } from 'src/users/decorators/roles.decorator';
import { UserRoleGuard } from 'src/users/guards/roles.guard';

@Controller('qualification')
@ApiTags('Calificacion')
@ApiBearerAuth()
export class QualificationController {
  constructor(private readonly qualificationService: QualificationService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @ApiBody({ type: CreateQualificationDto })
  async create(@Body() createQualificationDto: CreateQualificationDto) {
    return await this.qualificationService.create(createQualificationDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  async findAll() {
    return await this.qualificationService.findAll();
  }

  @Get('bests')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  async findBests() {
    return await this.qualificationService.findBests();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  findOne(@Param('id') id: string) {
    return this.qualificationService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  update(
    @Param('id') id: string,
    @Body() updateQualificationDto: UpdateQualificationDto,
  ) {
    return this.qualificationService.update(+id, updateQualificationDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserRoleGuard)
  remove(@Param('id') id: string) {
    return this.qualificationService.remove(+id);
  }
}
