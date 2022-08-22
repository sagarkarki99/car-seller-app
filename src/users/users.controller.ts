import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth/auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signin')
  async signinUser(@Body() body: CreateUserDto) {
    console.log('Logging in... please wait...');

    const user = await this.authService.signIn(body.email, body.password);

    console.log('Logging success!!!');

    return user;
  }

  @Get('/currentUser')
  getCurrentUser(@CurrentUser() user: string) {
    return user;
  }

  @Post('/signup')
  createUser(@Body() userDto: CreateUserDto) {
    this.authService.signup(userDto.email, userDto.password);
  }

  @Get('/:id')
  async findUser(@Param('id') id: number) {
    const user = await this.usersService.findOne(id);
    if (user == null) {
      throw new NotFoundException('User not found', 'NOT_FOUND');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() userDto: UpdateUserDto) {
    return this.usersService.update(id, userDto);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: number) {
    try {
      return this.usersService.delete(id);
    } catch (error) {
      console.log(error);

      throw new NotFoundException('User not found', 'NOT_FOUND');
    }
  }
}
