import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimationDto } from './dtos/get-estimation.dto';
import { Report } from './entity/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly repo: Repository<Report>,
  ) {}

  async create(body: CreateReportDto, user: User) {
    const report = this.repo.create(body);
    report.user = user;
    const savedReport = await this.repo.save(report);

    return savedReport;
  }

  getUserReports(user: User) {
    return this.repo.findBy({ user: user });
  }

  async createEstimation(query: GetEstimationDto) {
    const value = await this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('maker = :maker', { maker: query.maker })
      .andWhere('model = :model', { model: query.model })
      .andWhere('lng - :lng BETWEEN -5  AND 5', { lng: query.lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: query.lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year: query.year })
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage: query.mileage })
      .limit(3)
      .getRawOne();
    return value;
  }

  async approve(id: number, approver: User) {
    const report = await this.repo.findOneBy({ id });
    if (!report) {
      throw new NotFoundException('Report not found!');
    }
    report.approverId = approver.id;
    return this.repo.save(report);
  }
}
