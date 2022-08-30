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
      host: 'ec2-44-207-126-176.compute-1.amazonaws.com',
      port: 5432,
      database: 'ddt7t336acissd',
      username: 'xxjcgxrewdzuer',
      password:
        '5cd87529034f1724201d20d2c48e31dee0eb5c2960e1ce7b7c275a75e5a97967',
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
