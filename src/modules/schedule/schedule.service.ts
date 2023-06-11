import { Injectable, Logger } from '@nestjs/common'
import { Cron, SchedulerRegistry } from '@nestjs/schedule'

@Injectable()
export class ScheduleService {
	constructor(private schedulerRegistry: SchedulerRegistry) {}
	private readonly logger = new Logger(ScheduleService.name)

	// 每分钟的秒为45时debug
	@Cron('45 * * * * *', {
		name: 'mySchedule'
	})
	logInfo() {
		this.logger.debug('Called when the current second is 45')
	}

	// 停止定时任务
	stopLogInfo() {
		const job = this.schedulerRegistry.getCronJob('mySchedule')
		job.stop()
	}
}
