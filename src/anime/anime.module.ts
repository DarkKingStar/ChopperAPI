import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { AnimeDetailsModule } from './anime-details/anime-details.module';
import { AnimeSearchModule } from './anime-search/anime-search.module';
import { AnimeStreamModule } from './anime-stream/anime-stream.module';
import { AnimeFetchModule } from './anime-fetch/anime-fetch.module';

@Module({
  imports : [AnimeDetailsModule, AnimeSearchModule, AnimeStreamModule, AnimeFetchModule],
  controllers: [AnimeController],
  providers: [AnimeService],
})
export class AnimeModule {}
