import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {hash} from 'bcrypt';
@Schema()
export class User {
    @Prop()
    name: string;
    @Prop()
    email: string;
    @Prop({select: false})
    password: string;
     _id?: any;
}

export const UserEntitySchema = SchemaFactory.createForClass(User);

UserEntitySchema.pre<User>('save',   async function(next: Function) {
    this.password = await hash(this.password, 10);
    next();
})