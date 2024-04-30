import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users.module';
import { AnimeModule } from './modules/anime.module';

@Module({
  imports: [UsersModule, AnimeModule],
})
export class AppModule {
  constructor() {
    console.log('App Module Loaded');
  }
}
