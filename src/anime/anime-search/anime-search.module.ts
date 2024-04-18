import { Module } from '@nestjs/common';
import { AnimeSearchService } from './anime-search.service';
import { AnimeSearchController } from './anime-search.controller';

@Module({
  controllers: [AnimeSearchController],
  providers: [AnimeSearchService],
})
export class AnimeSearchModule {}
