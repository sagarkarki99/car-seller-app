import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @MinLength(7)
  @IsOptional()
  password: string;
}
