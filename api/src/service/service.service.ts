import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto) {
    return await this.prisma.service.create({
      data: {
        name: createServiceDto.name,
        price: createServiceDto.price,
        time: createServiceDto.time,
      },
    });
  }

  async findAll() {
    return await this.prisma.service.findMany({
      where: {
        is_removed: false,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    return await this.prisma.service.update({
      where: {
        id: id,
      },
      data: {
        name: updateServiceDto.name,
        price: updateServiceDto.price,
        time: updateServiceDto.time,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.service.update({
      where: {
        id: id,
      },
      data: {
        is_removed: true,
      },
    });
  }
}
