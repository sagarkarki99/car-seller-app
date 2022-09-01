import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
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

  async approve(id: number, isApproved: boolean) {
    const report = await this.repo.findOneBy({ id });
    if (!report) {
      throw new NotFoundException('Report not found!');
    }
    report.approved = isApproved;
    return this.repo.save(report);
  }
}
