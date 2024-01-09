import { IsDateString, IsInt, IsString } from 'class-validator';

export class CreateVisitDto {
  @IsString()
  note: string;

  @IsDateString()
  time_start: string;

  @IsDateString()
  time_end: string;

  @IsInt()
  client_id: number;

  @IsInt()
  service_id: number;
}
