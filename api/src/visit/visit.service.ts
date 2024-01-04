import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Injectable()
export class VisitService {
  constructor(private prisma: PrismaService) {}

  async create(createVisitDto: CreateVisitDto) {
    return await this.prisma.visit.create({
      data: {
        note: createVisitDto.note,
        time_start: createVisitDto.time_start,
        time_end: createVisitDto.time_end,
        userId: createVisitDto.user_id,
      },
    });
  }

  findAll() {
    return `This action returns all visit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} visit`;
  }

  update(id: number, updateVisitDto: UpdateVisitDto) {
    return `This action updates a #${id} visit`;
  }

  remove(id: number) {
    return `This action removes a #${id} visit`;
  }
}
