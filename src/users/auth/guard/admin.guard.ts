import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User, UserRoles } from 'src/users/user.entity';

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if (this.isAdmin(user)) {
      return true;
    }
    throw new UnauthorizedException('You do not have permission.');
  }

  private isAdmin(user: User): boolean {
    return user && user.role === UserRoles.admin;
  }
}
