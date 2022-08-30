import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User, UserRole } from '../entities/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!validRoles) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    console.log(user.rol);

    if (!user) throw new BadRequestException('User not found');

    if (validRoles.includes(user.rol)) {
      return true;
    }

    throw new ForbiddenException(`User ${user.nombre}, permissions denied`);
  }
}
