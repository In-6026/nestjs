import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class TestMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const query = req.query
		req.query = { ...query, flag: 'testMiddleware' }
		next()
	}
}
