import { Module } from '@nestjs/common';
import { AnimeSearchService } from '../services/anime-search.service';
import { AnimeSearchController } from '../controllers/anime-search.controller';

@Module({
  controllers: [AnimeSearchController],
  providers: [AnimeSearchService],
})
export class AnimeSearchModule {}
