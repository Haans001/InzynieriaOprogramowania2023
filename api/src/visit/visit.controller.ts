import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { VisitService } from './visit.service';

@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  create(@Body() createVisitDto: CreateVisitDto) {
    return this.visitService.create(createVisitDto);
  }

  @Get('day/:day')
  findForDay(@Param('day') day: string) {
    return this.visitService.findForDay(day);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitDto: UpdateVisitDto) {
    return this.visitService.update(+id, updateVisitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitService.remove(+id);
  }

  @Get('employee/:id')
  findEmployeeVisits(@Param('id') id: string) {
    return this.visitService.findEmployeeVisits(+id);
  }
}
