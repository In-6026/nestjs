import { Body, Controller, Post } from '@nestjs/common'
import { BullService } from './bull.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('bull')
@Controller('bull')
export class BullController {
	constructor(private readonly bullService: BullService) {}

	@Post('/crate_bull')
	crateBull(@Body('audioName') audioName: string) {
		return this.bullService.createdBull(audioName)
	}
}
