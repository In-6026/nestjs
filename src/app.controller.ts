import { Controller, Get, Req, Session } from '@nestjs/common'
import { AppService } from './app.service'
import { Request } from 'express'
import { ApiTags } from '@nestjs/swagger'

@ApiTags()
@Controller('/')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/')
	index(@Session() session: any, @Req() req: Request): string {
		session.code = 'captcha'
		console.log(
			`req.query was changed by middleware : ${JSON.stringify(req.query)}`
		)
		return 'this is index interfece'
	}

	@Get('/test_session')
	testSession(@Session() session: any): string {
		return 'session code is: ' + session.code
	}
}
