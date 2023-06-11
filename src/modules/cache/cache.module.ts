import { Module } from '@nestjs/common'
import { CacheController } from './cache.controller'
import { CacheService } from './cache.service'
import { CacheModule } from '@nestjs/cache-manager'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../user/schemas/user.schema'

@Module({
	imports: [
		CacheModule.register(),
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema, collection: 'user' }
		])
	],
	controllers: [CacheController],
	providers: [CacheService]
})
export class MyCacheModule {}
