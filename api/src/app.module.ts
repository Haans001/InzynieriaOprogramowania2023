import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { EmailModule } from './email/email.module';
import { EmployeeModule } from './employee/employee.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { ServiceModule } from './service/service.module';
import { VisitModule } from './visit/visit.module';

@Module({
  imports: [
    PrismaModule,
    VisitModule,
    ClientModule,
    ServiceModule,
    ProductModule,
    AuthModule,
    EmployeeModule,
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
