import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
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
  ],
})
export class AppModule {}
