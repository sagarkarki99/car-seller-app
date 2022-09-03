import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetEstimationDto {
  @IsString()
  maker: string;

  @IsString()
  model: string;

  @Transform((param) => parseInt(param.value))
  @IsNumber()
  @Min(1930)
  @Max(new Date().getFullYear())
  year: number;

  @Transform((param) => parseInt(param.value))
  @IsNumber()
  @Min(0)
  mileage: number;

  @Transform((param) => parseInt(param.value))
  @IsNumber()
  @IsLongitude()
  lng: number;

  @Transform((param) => parseInt(param.value))
  @IsNumber()
  @IsLatitude()
  lat: number;
}
