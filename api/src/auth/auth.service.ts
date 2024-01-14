import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EmployeeService } from 'src/employee/employee.service';
@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.employeeService.findByUsername(username);

    if (user) {
      const match = await bcrypt.compare(password, user.hashed_password);

      if (match) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hashed_password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async login(user: any) {
    console.log(process.env.JWT_SECRET);

    const payload = { username: user.username, sub: user.id, role: user.role };
    console.log('payload: ', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
