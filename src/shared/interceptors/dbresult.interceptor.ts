import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { shallowClone } from '../utils/clone'

interface IParam {
    key?: string
}

@Injectable()
export class DBresultInterceptor implements NestInterceptor {
    constructor(private readonly option: IParam) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                let dataClone = shallowClone(data)
                let target = dataClone
                if (this.option.key) {
                    const keys = this.option.key.split('.')
                    keys.forEach((key) => target = target[key])
                }
                delete target['_id']
                delete target['__v']
                return dataClone
            })
        )
    }
}
