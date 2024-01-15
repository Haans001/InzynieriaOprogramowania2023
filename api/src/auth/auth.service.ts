import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Employee } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { EmployeeService } from 'src/employee/employee.service';
@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<{
    success: boolean;
    message?: string;
    employee?: Omit<Employee, 'hashed_password'>;
  }> {
    const user = await this.employeeService.findByUsername(username);

    if (user) {
      const match = await bcrypt.compare(password, user.hashed_password);

      if (match) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hashed_password, ...employee } = user;
        return {
          success: true,
          employee,
        };
      } else {
        return {
          success: false,
          message: 'Hasło jest nieprawidłowe',
        };
      }
    }

    return {
      success: false,
      message: 'Nie znaleziono pracownika o podanym loginie.',
    };
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    console.log('payload: ', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout() {
    return {
      message: 'Logout successful',
    };
  }
}
