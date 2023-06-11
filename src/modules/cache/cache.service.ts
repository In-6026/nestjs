import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDocument } from '../user/schemas/user.schema'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject } from '@nestjs/common'
import { Cache } from 'cache-manager'

@Injectable()
export class CacheService {
	constructor(
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		@InjectModel('User') private userModel: Model<UserDocument>
	) {}

	intercep(param: string): string {
		return (
			'you are testing interceptor style cache, this is your param, maybe was cached: ' +
			param
		)
	}

	program(name: string): any {
		return new Promise(async (resolve, rejects) => {
			const info = await this.cacheManager.get('user-info')
			if (info) {
				//如果缓存有就不往数据库里取了，在这里直接返回
				return resolve(info)
			}
			this.userModel
				.find({ name })
				.then((result) => {
					const data = [...result]
					//  存入缓存
					this.cacheManager.set(
						'user-info',
						'user-info in cache',
						10 * 1000
					)
					resolve({ code: '1', data })
				})
				.catch((error) => {
					rejects({ code: '0', data: error })
				})
		})
	}
}
