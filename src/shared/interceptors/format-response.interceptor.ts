import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class FormateResponseInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const response = context.switchToHttp().getResponse()
        const statusCode = response.statusCode
        return next.handle().pipe(
            map((data) => ({code: 1, statusCode, data}))
        )
    }
}
