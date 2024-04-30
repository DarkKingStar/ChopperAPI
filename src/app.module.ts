import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users.module';
import { AnimeModule } from './modules/anime.module';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [UsersModule, AnimeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('App Module Loaded');
  }
}
