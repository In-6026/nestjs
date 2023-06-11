import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { shallowClone } from '../utils/clone'

interface IParam {
	type: 'single' | 'multiple'
}

@Injectable()
export class DBresultInterceptor implements NestInterceptor {
	constructor(private readonly option: IParam) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map((data: Array<Record<string, any>> | Record<string, any>) => {
				if (this.option.type == 'single') {
					const dataClone = shallowClone(data)
					delete dataClone['_id']
					delete dataClone['__v']
					return dataClone
				}
				const dataClone = shallowClone(data)
				dataClone.forEach((_, index: number) => {
					delete dataClone[index]['_id']
					delete dataClone[index]['__v']
				})
				return dataClone
			})
		)
	}
}
