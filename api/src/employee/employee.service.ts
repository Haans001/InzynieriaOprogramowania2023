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

  async findAll() {
    return await this.prisma.employee.findMany({
      where: {
        is_removed: false,
        email: {
          not: 'admin@kleopatra.com',
        },
      },
    });
  }

  async findOne(id: number) {
    const res = await this.prisma.employee.findUnique({
      where: {
        id,
      },
    });

    delete res.hashed_password;
    return res;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  async remove(id: number) {
    return await this.prisma.employee.update({
      where: {
        id,
      },
      data: {
        is_removed: true,
      },
    });
  }

  async findByUsername(username: string) {
    return await this.prisma.employee.findFirst({
      where: {
        username,
        is_removed: false,
      },
    });
  }
}
