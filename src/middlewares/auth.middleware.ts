import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "src/entities/user.entity";
import { UsersService } from "src/services/users.service";

export interface ExpressRequest extends Request {
    user?: User
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private userService: UsersService) {}
    async use(req : ExpressRequest, res: Response, next: NextFunction) {
        if(!req.headers['authorization']){
            req.user = null;
            next();
            return;
        }
        const token = req.headers['authorization'].replace('Bearer ', '');
        try{
            const decode = verify(token, process.env.JWT_SECRET) as {email: string, _id: string};
            const user = await this.userService.findOne(decode._id);
            req.user = user;
            next();
        }catch(err){
            req.user = null;
            next();
        }
    }
}