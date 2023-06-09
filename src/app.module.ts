import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './modules/user/user.module'
import { FileModule } from './modules/file/file.module'
import { MyCacheModule } from './modules/cache/cache.module'
import { TestMiddleware } from './common/middleware/test.middleware'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

const IS_DEV = process.env.NODE_ENV == 'dev'
let envFilePath = []
envFilePath.unshift(IS_DEV ? '.env.dev' : '.env.prod')

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath,
			isGlobal: true
		}),
		MongooseModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get('DATABASE_HOST')
			})
		}),
		UserModule,
		FileModule,
		MyCacheModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(TestMiddleware).forRoutes('/')
	}
}
