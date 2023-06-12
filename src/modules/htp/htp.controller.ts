import { Controller, Get,Res } from '@nestjs/common'
import { HtpService } from './htp.service'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

@ApiTags('htp')
@Controller('htp')
export class HtpController {
	constructor(private readonly htpService: HtpService) {}

	@Get('/')
	async testAxios(@Res() res: Response) {
		const stream = await this.htpService.testAxios();
		res.set({
		  'Content-Type': (<any>stream).headers['content-type'],
		});
		(<any>stream).data.pipe(res)
		// return this.htpService.testAxios()
	}
}
