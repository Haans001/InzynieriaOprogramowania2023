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
        userId: createVisitDto.client_id,
        serviceId: createVisitDto.service_id,
      },
    });
  }

  async findForDay(day: string) {
    console.log(day);
    console.log(new Date(`${day}T00:00:00Z`).toISOString());
    return await this.prisma.visit.findMany({
      where: {
        time_start: {
          gte: new Date(`${day}T00:00:00Z`),
          lt: new Date(`${day}T23:59:59Z`),
        },
      },
      include: {
        user: true,
        service: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} visit`;
  }

  async update(id: number, updateVisitDto: UpdateVisitDto) {
    return await this.prisma.visit.update({
      where: {
        id: id,
      },
      data: {
        note: updateVisitDto.note,
        time_start: updateVisitDto.time_start,
        time_end: updateVisitDto.time_end,
        userId: updateVisitDto.client_id,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.visit.delete({
      where: {
        id: id,
      },
    });
  }
}
