import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ADMIN_ROUTE_KEY } from '../decorators/admin-route.decorator';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isAdminRoute = this.reflector.get<boolean>(
      ADMIN_ROUTE_KEY,
      context.getHandler(),
    );

    if (isAdminRoute) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      return user?.role === Role.ADMIN;
    }

    return true; // Allow access for non-admin routes
  }
}
