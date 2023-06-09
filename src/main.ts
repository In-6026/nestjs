import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { UserModule } from './modules/user/user.module'
import { MyCacheModule } from './modules/cache/cache.module'
import { FileModule } from './modules/file/file.module'
import * as session from 'express-session'
import * as  cors from 'cors'
import { ValidationPipe } from '@nestjs/common'
import { GlobalExceptionsFilter } from './common/filter/global.exception.filter'
import { FormateResponseInterceptor } from './shared/interceptors/format-response.interceptor'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	// 接口文档
	const apiOptions = new DocumentBuilder()
		.setTitle('this is a title')
		.setDescription('this is a description')
		.setVersion('1.0')
		.addTag('user')
		.addTag('file')
		.addTag('cache')
		.build()
	const apiDoc = SwaggerModule.createDocument(app, apiOptions, {
		include: [UserModule, FileModule, MyCacheModule]
	})
	SwaggerModule.setup('api-doc', app, apiDoc)

	// 格式化响应数据
	app.useGlobalInterceptors(new FormateResponseInterceptor())

	// 异常过滤器
	app.useGlobalFilters(new GlobalExceptionsFilter())

	// 参数校验
	app.useGlobalPipes(new ValidationPipe())

	// session
	app.use(session({ secret: 'llc', name: 'lilianci', rolling: false, cookie: { maxAge: 5000 } }))

	// 跨域
	app.use(cors())

	// 静态资源托管
	app.useStaticAssets(join(__dirname, '../public'), { prefix: '/public' })

	// 启动
	await app.listen(3000)
}
bootstrap()
