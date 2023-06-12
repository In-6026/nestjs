import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

@Injectable()
export class MittService {
	@OnEvent('test_mitt')
	testMitt({ message }) {
		console.log('you are  testing mitt and get a message: ', message)
	}
}
