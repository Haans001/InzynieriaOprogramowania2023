import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.appService.getAllUsers();
  }
}
