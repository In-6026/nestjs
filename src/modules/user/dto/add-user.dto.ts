import { IsString, IsNumber, IsNotEmpty, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({ type: String, description: '名字', required: true })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ type: String, description: '性别' })
    @IsString()
    gender: string

    @ApiProperty({ type: Number, description: '年龄' })
    @IsNumber()
    age: number
}

export class CreateUserResDto {
    @ApiProperty({ type: Number, description: '号码', required: true })
    @IsNumber()
    code: string

    @ApiProperty({ type: Number, description: '状态码', required: true })
    @IsString()
    statusCode: string

    @ApiProperty({ type: [CreateUserDto], description: '信息', required: true })
    @IsArray()
    @IsNotEmpty()
    data: Array<CreateUserDto>
}