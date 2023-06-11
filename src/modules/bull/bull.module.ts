import { Module } from '@nestjs/common'
import { BullController } from './bull.controller'
import { BullService } from './bull.service'
import { BullModule } from '@nestjs/bull'
// reference: https://blog.csdn.net/yehuozhili/article/details/112919547

@Module({
	imports: [
		BullModule.registerQueue({
			name: 'audio',
			redis: {
				host: 'localhost',
				port: 6379
			}
		})
	],
	controllers: [BullController],
	providers: [BullService]
})
export class MyBullModule {}
