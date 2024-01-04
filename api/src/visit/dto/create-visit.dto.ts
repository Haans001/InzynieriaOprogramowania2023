import { IsDateString, IsInt, IsString } from 'class-validator';

export class CreateVisitDto {
  @IsString()
  note: string;

  @IsDateString()
  time_start: string;

  @IsDateString()
  time_end: string;

  @IsInt()
  user_id: number;
}
