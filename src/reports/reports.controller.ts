import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/auth/guard/jwt-auth.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('/')
  createReport(@Body() body: CreateReportDto) {
    this.reportsService.create(body);
    console.log(`Saving ${body}`);
  }
}
