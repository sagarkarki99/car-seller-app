import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() userDto: CreateUserDto) {
    this.usersService.create(userDto.email, userDto.password);
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
    console.log(email);

    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string) {}

  @Delete()
  removeUser(@Param('id') id: string) {}
}
