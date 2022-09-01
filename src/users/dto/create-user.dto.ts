import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(7, { message: 'Password is too weak!' })
  password: string;

  @IsOptional()
  type?: string;
}
