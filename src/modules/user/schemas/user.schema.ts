import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class User extends Document {
	@Prop({ sparse: true })
	name: string

	@Prop()
	gender: string

	@Prop()
	age: number
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)
