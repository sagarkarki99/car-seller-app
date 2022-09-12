import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
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
import { GetEstimationDto } from './dtos/get-estimation.dto';
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
  getEstimation(@Query() query: GetEstimationDto) {
    return this.reportsService.createEstimation(query);
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  approveReport(@Param('id') id: string, @AdminUser() admin) {
    return this.reportsService.approve(parseInt(id), admin);
  }
}
