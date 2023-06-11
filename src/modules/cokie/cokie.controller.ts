import { Controller, Post, Res, Req, Body } from '@nestjs/common'
import { CokieService } from './cokie.service'
import { ApiTags } from '@nestjs/swagger'
import { Response, Request } from 'express'

@ApiTags('cokie')
@Controller('cokie')
export class CokieController {
	constructor(private readonly cokieService: CokieService) {}

	@Post('/')
	setCokie(
		@Body('key') key: string,
		@Body('value') value: string,
		@Req() req: Request,
		@Res() res: Response
	): any {
		console.log('already owner cookie: ', JSON.stringify(req.cookies))
		res.cookie(key, value)
		console.log('after set cookie!')
		res.send('set cookie succes!')
	}
}
