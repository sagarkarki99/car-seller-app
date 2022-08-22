import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const requst = ctx.switchToHttp().getRequest();
    return requst.currentUser;
  },
);
