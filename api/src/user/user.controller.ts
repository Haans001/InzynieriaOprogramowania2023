import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private appService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    console.log('getAllUser ss');
    return await this.appService.getAllUsers();
  }
}
