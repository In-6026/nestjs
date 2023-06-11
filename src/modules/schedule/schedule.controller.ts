import { Controller } from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('schedule')
@Controller('user')
export class ScheduleController {
	constructor(private readonly scheduleService: ScheduleService) {}
}
