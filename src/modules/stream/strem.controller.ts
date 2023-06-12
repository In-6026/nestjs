import { Controller, Get, StreamableFile, Response } from '@nestjs/common'
import { StremService } from './strem.service'
import { ApiTags } from '@nestjs/swagger'
import { createReadStream } from 'fs'
import { join } from 'path'

@ApiTags('strem')
@Controller('strem')
export class StremController {
	constructor(private readonly stremService: StremService) { }

	@Get('/')
	stremFile(): StreamableFile {
		// 切记不能通过interceprtor格式化，否则传输的不是文件，而是文件信息
		// 务必直接返回new StreamableFile(readStream)
		const file = join(process.cwd(), 'package.json')
		const readStream = createReadStream(file)
		return new StreamableFile(readStream)
	}
}
