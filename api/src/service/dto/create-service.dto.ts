import { IsInt, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsInt()
  price: number;

  @IsInt()
  time: number;
}
