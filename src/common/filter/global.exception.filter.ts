import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const request = ctx.getRequest()

        if (exception instanceof HttpException) {
            const status = exception.getStatus()
            const errResponse = exception?.getResponse() as Record<string, any> || {}
            response.status().json({
                code: 0,
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                method: request.method,
                error: exception.name,
                errorMsg: errResponse?.message || exception.message
            })
        } else {
            const status = HttpStatus.INTERNAL_SERVER_ERROR
            response.json({
                statusCode: status,
                error: 'Internal server error'
            })
        }
    }
}
