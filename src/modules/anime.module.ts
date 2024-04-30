import { Module } from '@nestjs/common';

import { AnimeDetailsModule } from './anime-details.module';
import { AnimeSearchModule } from './anime-search.module';
import { AnimeStreamModule } from './anime-stream.module';
import { AnimeFetchModule } from './anime-fetch.module';

@Module({
  imports : [AnimeDetailsModule, AnimeSearchModule, AnimeStreamModule, AnimeFetchModule],
  // controllers: [AnimeController],
  // providers: [AnimeService],
})
export class AnimeModule {}
