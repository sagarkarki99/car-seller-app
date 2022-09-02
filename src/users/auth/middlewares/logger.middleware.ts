import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';

export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: (error?: any) => void) {
    console.log(`-------------Request-------------`);
    console.log(`Url: : ${req.method} ${req.baseUrl}`);
  }
}
