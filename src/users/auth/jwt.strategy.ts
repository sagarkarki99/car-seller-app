import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../user.entity';
import { UsersService } from '../users.service';
import { UserPayload } from './auth.service';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: UserPayload) {
    console.log(`validating payload... ${payload.email}`);

    const [user] = await this.usersService.find(payload.email);
    //any sorts of validation should be done here (I think)
    if (!user) {
      throw new UnauthorizedException('Token in invalid');
    }

    return user;
  }
}
