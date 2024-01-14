import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const { password, ...rest } = createEmployeeDto;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    return await this.prisma.employee.create({
      data: {
        ...rest,
        hashed_password: hashedPassword,
      },
    });
  }

  findAll() {
    return `This action returns all employee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }

  async findByUsername(username: string) {
    return await this.prisma.employee.findFirst({
      where: {
        username,
      },
    });
  }
}
