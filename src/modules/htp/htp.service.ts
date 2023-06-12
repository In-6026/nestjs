import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class HtpService {
	constructor(private readonly httpService: HttpService) {}

	async testAxios() {
		const url = 'https://img2.baidu.com/it/u=1361506290,4036378790&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
		return this.httpService.get(url, { responseType: 'stream' })
	}
}
