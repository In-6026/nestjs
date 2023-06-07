import { Module } from '@nestjs/common'
import { FileController } from './file.controller'
import { FileService } from './file.service'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname, join } from 'path'

@Module({
	imports: [
		MulterModule.register({
			storage: diskStorage({
				destination: join(__dirname, '../../..', '/public/static/images'),
				filename: (_, file, callback) => {
					const name = `${new Date().getTime() + extname(file.originalname)}`
					return callback(null, name)
				}
			})
		})
	],
	controllers: [FileController],
	providers: [FileService],
})
export class FileModule { }
