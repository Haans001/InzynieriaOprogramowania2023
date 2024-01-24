import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
@Injectable()
export class VisitService {
  constructor(
    private prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async create(createVisitDto: CreateVisitDto) {
    const result = await this.prisma.visit.create({
      data: {
        note: createVisitDto.note,
        time_start: createVisitDto.time_start,
        time_end: createVisitDto.time_end,
        userId: createVisitDto.client_id,
        serviceId: createVisitDto.service_id,
        employeeId: createVisitDto.employee_id,
      },
      select: {
        user: {
          select: {
            email: true,
          },
        },
        Employee: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });

    const user = result.user;
    const employee = result.Employee;

    const visitInfo = {
      date: format(new Date(createVisitDto.time_start), 'dd-MM-yyyy'),
      hour: format(new Date(createVisitDto.time_start), 'HH:mm'),
      employee: `${employee.first_name} ${employee.last_name}`,
    };

    const emailTemplate = `
          <h2>Potwierdzenie Wizyty w Salonie Fryzjerskim Kleopatra</h2>
          <p>Dzień wizyty: ${visitInfo.date}</p>
          <p>Godzina wizyty: ${visitInfo.hour}</p>
          <p>Fryzjer obsługujący wizytę: ${visitInfo.employee}</p>
          <p>Dziękujemy za skorzystanie z usług Salonu Fryzjerskiego Kleopatra. Czekamy na Ciebie!</p>
        `;

    await this.emailService.sendEmail(
      'Potwierdzenie Wizyty w Salonie Fryzjerskim Kleopatra',
      emailTemplate,
      user.email,
    );

    return result;
  }

  async findForDay(day: string) {
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
        Employee: true,
      },
    });
  }

  async findEmployeeVisits(employee_id: number) {
    return await this.prisma.visit.findMany({
      where: {
        employeeId: employee_id,
      },
      include: {
        user: true,
        service: true,
        Employee: true,
      },
    });
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
