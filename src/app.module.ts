import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './modules/user/user.module'
import { FileModule } from './modules/file/file.module'
import { TestMiddleware } from './common/middleware/test.middleware'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['.env.development', '.env.production'],
			isGlobal: true
		}),
		MongooseModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get('DATABASE_HOST')
			})
		}),
		UserModule,
		FileModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(TestMiddleware).forRoutes('/')
	}

	constructor(private configService:  ConfigService) {
		console.log('this.configService: ',  this.configService.get('DATABASE_HOST'))
	}
}
