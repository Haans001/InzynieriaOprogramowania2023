import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Employee } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { EmployeeService } from 'src/employee/employee.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePasswordDto } from './dto/change-password-dto';

export interface BaseResponse {
  success: boolean;
  message?: string;
}
@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<
    BaseResponse & {
      employee?: Omit<Employee, 'hashed_password'>;
    }
  > {
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

  async changePassword(
    employeeId: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<BaseResponse> {
    const { hashed_password } = await this.prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
      select: {
        hashed_password: true,
      },
    });

    const currentPasswordMatch = await bcrypt.compare(
      changePasswordDto.currentPassword,
      hashed_password,
    );

    if (!currentPasswordMatch) {
      return {
        success: false,
        message: 'Aktualne hasło jest nieprawidłowe',
      };
    }

    const newPasswordHash = await bcrypt.hash(
      changePasswordDto.newPassword,
      10,
    );

    try {
      await this.prisma.employee.update({
        where: {
          id: employeeId,
        },
        data: {
          hashed_password: newPasswordHash,
        },
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Wystąpił błąd podczas zmiany hasła',
      };
    }
  }
}
