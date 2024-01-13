import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/role.enum';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  private readonly employees = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
      role: Role.Admin,
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess',
      role: Role.Employee,
    },
  ];

  create(createEmployeeDto: CreateEmployeeDto) {
    return 'This action adds a new employee';
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
    return this.employees.find((employee) => employee.username === username);
  }
}
