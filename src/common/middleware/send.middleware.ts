import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class FormatResSendDataMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const originalSend = res.send

		// 重写send方法
		res.send = function (body?: any): Response {
			const statusCode = res.statusCode
			const newBody = JSON.stringify({ code: 1, statusCode, body })
			return originalSend.call(this, newBody)
		}
		next()
	}
}
