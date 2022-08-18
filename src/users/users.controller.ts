import {
  Body,
  Controller,
  Delete,
  Get,
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
    console.log(userDto);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    console.log(id);
  }

  @Get()
  findAllUsers(@Query('email') email: string) {}

  @Patch('/:id')
  updateUser(@Param('id') id: string) {}

  @Delete()
  removeUser(@Param('id') id: string) {}
}
