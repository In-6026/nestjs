import { Module } from '@nestjs/common'
import { HtpController } from './htp.controller'
import { HtpService } from './htp.service'
import { HttpModule } from '@nestjs/axios'

@Module({
	imports: [
		HttpModule.register({
			timeout: 5 * 1000,
			maxRedirects: 5
		})
	],
	controllers: [HtpController],
	providers: [HtpService]
})
export class HtpModule { }
