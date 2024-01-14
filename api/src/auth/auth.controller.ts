import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';
import { AuthService } from './auth.service';
import { AdminRoute } from './decorators/admin-route.decorator';
import { Public } from './decorators/is-public.decorator';
import { LoginDto } from './dto/login-dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  async getProfile(@Request() req) {
    console.log('req.user: ', req.user);
    return await this.employeeService.findOne(req.user.userId);
  }

  @AdminRoute()
  @Get('protected')
  getProtected() {
    return 'protected';
  }
}
