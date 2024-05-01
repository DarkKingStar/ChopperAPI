import { Module} from '@nestjs/common';

import { UsersModule } from './modules/users.module';
import { AnimeModule } from './modules/anime.module';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PlaylistModule } from './modules/playlist.module';

@Module({
  imports: [
    UsersModule,
    AnimeModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    PlaylistModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('App Module Loaded');
  }
}
