import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UserDocument } from './schemas/user.schema'
import { Model } from 'mongoose'
import { AddUserDto } from './dto/add-user.dto'
import { ConfigService } from '@nestjs/config/dist'

@Injectable()
export class UserService {
	constructor(
		private configService: ConfigService,
		@InjectModel('User') private userModel: Model<UserDocument>
	) { }

	add(addUserDto: AddUserDto): Promise<Record<string, string>> {
		return new Promise((resolve, reject) => {
			const user = new this.userModel(addUserDto)
			user.save().then(() => {
				resolve({
					code: '1',
					msg: `user add ${addUserDto.name} is succed!`
				})
			}).catch((error: any) => reject({ code: '0', msg: error }))
		})
	}

	get(): Promise<Record<string, any>> {
		return new Promise((resolve, rejects) => {
			this.userModel.find()
				.then((result) => {
					const data = [...result]
					data.map((_, index) => {
						delete data[index]._id
						delete data[index].__v
					})
					resolve({ code: '1', data, msg: this.configService.get('DATABASE_HOST') })
				})
				.catch((error) => {
					rejects({ code: '0', data: error })
				})
		})
	}
}
