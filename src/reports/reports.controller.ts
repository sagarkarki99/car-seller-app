import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AdminGuard } from 'src/users/auth/guard/admin.guard';
import { JwtAuthGuard } from 'src/users/auth/guard/jwt-auth.guard';
import {
  AdminUser,
  CurrentUser,
} from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportResponseDto } from './dtos/report-response.dto';
import { ReportsService } from './reports.service';

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('/')
  @Serialize(ReportResponseDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Get('/')
  getReports(@CurrentUser() user: User) {
    return this.reportsService.getUserReports(user);
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  approveReport(
    @Param('id') id: string,
    @AdminUser() admin,
    @Body() body: any,
  ) {
    return this.reportsService.approve(parseInt(id), body.approve as boolean);
  }
}
