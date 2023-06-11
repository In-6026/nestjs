import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

@Injectable()
export class FormateResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const response = context.switchToHttp().getResponse()
		try {
			const statusCode = response.statusCode
			return next.handle().pipe(
				tap(() => {
					console.log('entry interceptor: ')
				}),
				map((data) => ({ code: 1, statusCode, data })),
				tap(() => {
					console.log('leave interceptor: ')
				})
			)
		} catch (err) {
			console.error('err: ', err)
			return next.handle().pipe(map((data) => data))
		}
	}
}
