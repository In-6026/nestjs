import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { UserModule } from './modules/user/user.module'
import * as session from 'express-session'
import * as  cors from 'cors'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	// 接口文档
	const apiOptions = new DocumentBuilder()
		.setTitle('this is a title')
		.setDescription('this is a description')
		.setVersion('1.0')
		.addTag('user')
		.addTag('file')
		.build()
	const apiDoc = SwaggerModule.createDocument(app, apiOptions, {
		include: [UserModule]
	})
	SwaggerModule.setup('api-doc', app, apiDoc)

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
