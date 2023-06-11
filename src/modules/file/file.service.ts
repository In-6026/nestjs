import { Injectable } from '@nestjs/common'

@Injectable()
export class FileService {
	userAdd(name: string): Record<string, string> {
		return {
			code: '200',
			msg: `user add ${name} is succed!`
		}
	}
}
