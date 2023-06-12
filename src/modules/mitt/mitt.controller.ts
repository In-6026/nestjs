import { Body, Controller, Get, Post } from '@nestjs/common'
import { MittService } from './mitt.service'
import { ApiTags } from '@nestjs/swagger'
import { EventEmitter2 } from '@nestjs/event-emitter'

@ApiTags('mitt')
@Controller('mitt')
export class MittController {
	constructor(
		private readonly mittService: MittService,
		private eventEmitter: EventEmitter2
	) { }

	@Get('/')
	createMitter() {
		this.eventEmitter.emit('test_mitt', { message: 'hello mitter' })
		return 'create emitter success!'
	}

	@Get('/cokie')
	createMitterForCokie() {
		this.eventEmitter.emit('test_mitt_in_cokieService', { message: 'a message from mitt.service' })
		return 'create emitter success in cokie.service!'
	}

	@Get('/test_compress')
	testCompress() {
		return new Array(1000000).fill('abcdefghijklmnopqrstuvwxyz').join('')
	}
}
