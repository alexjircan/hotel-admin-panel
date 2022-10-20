import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { StatusModule } from './modules/status/status.module';
import { PrismaModule } from './core/prisma/prisma.module';

@Module({
  imports: [StatusModule, ScheduleModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
