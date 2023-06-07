import { Controller, Post, Get, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags, ApiBody } from '@nestjs/swagger'
import { AddUserDto } from './dto/add-user.dto'

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiBody({ type: AddUserDto, description: '用户信息' })
    @Post('/')
    add(@Body() body: AddUserDto): Promise<Record<string, string>> {
        return this.userService.add(body)
    }

    @Get('/')
    get(): Promise<Record<string, any>> {
        return this.userService.get()
    }
}
