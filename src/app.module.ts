import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SubjectModule } from './subject/subject.module';
import { GradeModule } from './grade/grade.module';
import { StudentModule } from './student/student.module';
import { AssistanceModule } from './assistance/assistance.module';
import { QualificationModule } from './qualification/qualification.module';
import { PeriodModule } from './period/period.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: '.env',
    }),
    UsersModule,
    TypeOrmModule.forRoot({
      ssl: process.env.ENV === 'prod',
      extra: {
        ssl: process.env.ENV === 'prod' ? { rejectUnauthorized: false } : null,
      },
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.PORT,
      database: process.env.DATABASE_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      autoLoadEntities: true,
      synchronize: true,
    }),
    SubjectModule,
    GradeModule,
    StudentModule,
    AssistanceModule,
    QualificationModule,
    PeriodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
