import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

export class CurrentUserInteraction implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;
    if (userId) {
      const fetchedUser = await this.userService.findOne(userId);
      request.currentUser = fetchedUser;
    }

    return next.handle();
  }
}
