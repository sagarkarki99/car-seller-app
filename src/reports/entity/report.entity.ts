import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  maker: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  price: number;

  @Column({ default: null })
  approverId?: number;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
