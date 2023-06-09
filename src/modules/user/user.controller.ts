import { Controller, Post, Get, Body, UseInterceptors, Query, ClassSerializerInterceptor, Redirect } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags, ApiResponse } from '@nestjs/swagger'
import { CreateUserDto, CreateUserResDto } from './dto/add-user.dto'
import { DBresultInterceptor } from 'src/shared/interceptors/dbresult.interceptor'

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiResponse({ type: CreateUserResDto })
    @Post('/')
    @UseInterceptors(new DBresultInterceptor({}))
    create(@Body() body: CreateUserDto): Promise<CreateUserDto> {
        return this.userService.create(body)
    }

    @ApiResponse({ type: CreateUserResDto })
    @Get('/')
    get(@Query('name') name: string): Promise<CreateUserDto[]> {
        return this.userService.get(name)
    }
}
