import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AnimeModule } from './anime/anime.module';

@Module({
  imports: [UsersModule, AnimeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
