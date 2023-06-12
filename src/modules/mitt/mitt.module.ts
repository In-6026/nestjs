import { Module } from '@nestjs/common'
import { MittController } from './mitt.controller'
import { MittService } from './mitt.service'
import { EventEmitterModule } from '@nestjs/event-emitter'

@Module({
	imports: [EventEmitterModule.forRoot()],
	controllers: [MittController],
	providers: [MittService]
})
export class MittModule {}
