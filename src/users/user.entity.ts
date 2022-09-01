import { Report } from 'src/reports/entity/report.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: UserRoles;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}

export enum UserRoles {
  admin = 'admin',
  normal = 'normal',
}
