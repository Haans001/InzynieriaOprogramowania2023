import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';

@Module({
  imports: [EmailModule],
  controllers: [VisitController],
  providers: [VisitService],
})
export class VisitModule {}
