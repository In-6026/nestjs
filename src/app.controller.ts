import { Controller, Get, ImATeapotException, Req, Res, Session } from '@nestjs/common'
import { AppService } from './app.service'
import { Response, Request } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { request } from 'http'


@ApiTags()
@Controller('/')
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('/')
    index(@Session() session: any, @Req() req: Request): string {
        session.code = 'captcha'
        console.log('req.query: ', req.query)
        return 'this is index interfece'
    }

    @Get('/test_session')
    testSession(@Session() session: any): Record<string, string> {
        console.log('session: ', session)
        return {
            message: session.code
        }
    }
}
