import {
	Controller,
	Get,
	Query,
	Session,
	UseInterceptors
} from '@nestjs/common'
import { CacheService } from './cache.service'
import { ApiTags, ApiQuery } from '@nestjs/swagger'
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager'

@ApiTags('cache')
@Controller('cache')
export class CacheController {
	constructor(private readonly cacheService: CacheService) {}

	@ApiQuery({ type: String, description: '任意' })
	@Get('/intercep')
	@CacheKey('test-interceptor')
	@CacheTTL(10 * 1000)
	@UseInterceptors(CacheInterceptor)
	intercep(@Query('param') param: string): string {
		return this.cacheService.intercep(param)
	}

	@ApiQuery({ type: String, description: '任意' })
	@Get('/program')
	program(@Query('name') name: string): any {
		return this.cacheService.program(name)
	}
}
