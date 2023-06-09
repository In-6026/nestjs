import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UserDocument } from './schemas/user.schema'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/add-user.dto'

@Injectable()
export class UserService {
	constructor(@InjectModel('User') private userModel: Model<UserDocument>,) { }

	create(userInfo: CreateUserDto): Promise<CreateUserDto> {
		return new Promise((resolve, reject) => {
			const user = new this.userModel(userInfo)
			user.save().then(
				(data) => resolve(data),
				(error: any) => reject(error)
			)
		})
	}

	get(name: string): Promise<CreateUserDto[]> {
		return new Promise((resolve, rejects) => {
			this.userModel.find({ name })
				.then(
					(result) => resolve(result),
					(error) => rejects(error)
				)
		})
	}
}
