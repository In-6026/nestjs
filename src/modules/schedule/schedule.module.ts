import { Module } from '@nestjs/common'
import { ScheduleController } from './schedule.controller'
import { ScheduleService } from './schedule.service'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
	imports: [ScheduleModule.forRoot()],
	controllers: [ScheduleController],
	providers: [ScheduleService]
})
export class MyScheduleModule {}
