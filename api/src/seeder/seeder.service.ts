import { Injectable } from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class SeederService {
  constructor(private readonly employeeService: EmployeeService) {}

  async seed() {
    // Add initial admin user
    await this.employeeService.create({
      first_name: 'Admin',
      last_name: 'Admin',
      email: 'admin@kleopatra.com',
      password: 'admin',
      username: 'admin',
      role: 'ADMIN',
    });

    console.log('Seed completed');
  }
}
