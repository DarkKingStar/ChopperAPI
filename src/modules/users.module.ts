import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserEntitySchema } from 'src/entities/user.entity';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  imports: [MongooseModule.forFeature([{name:User.name, schema:UserEntitySchema}])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
  constructor(private readonly usersService: UsersService) {
    console.log("user Module Loaded")
  }
  configure(consumer: MiddlewareConsumer ) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    })
  }
}
