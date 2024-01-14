import { Role } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  role: Role;

  @IsString()
  about: string;
}
