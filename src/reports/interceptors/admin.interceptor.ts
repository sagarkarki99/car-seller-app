import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User, UserRoles } from 'src/users/user.entity';

export class AdminInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    if (user.role != UserRoles.admin) {
      throw new UnauthorizedException(
        'You do not have permission to approve this report.',
      );
    }
    return next.handle();
  }
}
