import { Expose, Transform } from 'class-transformer';

export class ReportResponseDto {
  @Expose()
  id: number;

  @Expose()
  maker: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  mileage: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  price: number;

  @Transform((params) => params.obj.user.id)
  @Expose()
  userId: number;
}
