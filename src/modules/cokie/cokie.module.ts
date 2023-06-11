import { MiddlewareConsumer, Module } from '@nestjs/common'
import { CokieController } from './cokie.controller'
import { CokieService } from './cokie.service'
import { FormatResSendDataMiddleware } from 'src/common/middleware/send.middleware'

@Module({
	imports: [],
	controllers: [CokieController],
	providers: [CokieService]
})
export class CokieModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(FormatResSendDataMiddleware).forRoutes('/cokie')
	}
}
