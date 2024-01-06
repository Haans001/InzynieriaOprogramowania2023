import { IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  email: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;
}
