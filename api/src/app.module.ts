import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { VisitModule } from './visit/visit.module';
import { ClientModule } from './client/client.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [PrismaModule, VisitModule, ClientModule, ServiceModule],
})
export class AppModule {}
