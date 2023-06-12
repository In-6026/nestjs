import { Module } from '@nestjs/common'
import { StremController } from './strem.controller'
import { StremService } from './strem.service'

@Module({
	imports: [],
	controllers: [StremController],
	providers: [StremService]
})
export class StremModule {}
