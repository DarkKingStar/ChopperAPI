import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {hash} from 'bcrypt';
@Schema()
export class User {

    // for user full name
    @Prop()
    name: string;

    // for user email
    @Prop()
    email: string;

    // for user password 
    @Prop({select: false})
    password: string;
    
    //for profile image
    @Prop()
    avatar: string;
    
    //for created time
    @Prop({default: Date.now})
    created_At: Date;

    //for updated time
    @Prop({default: Date.now})
    updated_At: Date;

    //for user id
     _id?: any;
}

export const UserEntitySchema = SchemaFactory.createForClass(User);

UserEntitySchema.pre<User>('save',   async function(next: Function) {
    this.password = await hash(this.password, 10);
    next();
})