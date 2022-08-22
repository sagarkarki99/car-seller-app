import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from '../user.entity';
import { UsersService } from '../users.service';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signIn(email: string, password: string): Promise<User> {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new BadRequestException(
        'Incorrect email or password.',
        'INCORRECT_CREDENTIALS',
      );
    }

    const [_, salt] = user.password.split('.');
    const testPassword = await this.getEncryptedPassword(password, salt);

    if (user.password !== testPassword) {
      throw new BadRequestException(
        'Incorrect email or password.',
        'INCORRECT_CREDENTIALS',
      );
    }

    return user;
  }

  async signup(email: string, password: string): Promise<User> {
    const users = await this.userService.find(email);
    if (users.length !== 0) {
      throw new BadRequestException('User Already Registered');
    }
    const salt = randomBytes(8).toString('hex');
    const finalPassword = await this.getEncryptedPassword(password, salt);

    const user = this.userService.create(email, finalPassword);
    return user;
  }

  private async getEncryptedPassword(password: string, salt: string) {
    const value = (await scrypt(password, salt, 32)) as Buffer;
    return value.toString('hex') + '.' + salt;
  }
}
