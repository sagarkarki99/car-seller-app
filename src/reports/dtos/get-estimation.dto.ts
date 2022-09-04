import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetEstimationDto {
  @IsOptional()
  @IsString()
  maker: string;

  @IsOptional()
  @IsString()
  model: string;

  @Transform((param) => parseInt(param.value))
  @IsOptional()
  @IsNumber()
  @Min(1930)
  @Max(new Date().getFullYear())
  year: number;

  @Transform((param) => parseInt(param.value))
  @IsOptional()
  @IsNumber()
  @Min(0)
  mileage: number;

  @Transform((param) => parseFloat(param.value))
  @IsOptional()
  @IsNumber()
  @IsLongitude()
  lng: number;

  @Transform((param) => parseFloat(param.value))
  @IsOptional()
  @IsNumber()
  @IsLatitude()
  lat: number;
}
