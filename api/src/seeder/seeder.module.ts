// src/seeder/seeder.module.ts
import { Module } from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SeederService } from './seeder.service';

@Module({
  providers: [SeederService, EmployeeService, PrismaService],
})
export class SeederModule {}
