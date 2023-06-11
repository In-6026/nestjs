import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileService } from './file.service'
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger'
import { Request, Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import { File } from 'buffer'

@ApiTags('file')
@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@ApiBody({ type: File, description: '文件' })
	@Post('/upload')
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(@UploadedFile() file: Express.Multer.File): string {
		console.log('file: ', file)
		return 'ok!!'
	}
}
