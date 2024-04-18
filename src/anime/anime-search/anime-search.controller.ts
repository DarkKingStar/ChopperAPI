import { Controller, Get, Param } from '@nestjs/common';
import { AnimeSearchService } from './anime-search.service';

@Controller('search')
export class AnimeSearchController {
  constructor(private readonly animeSearchService: AnimeSearchService) {}

  @Get()
  findByQuery(@Param('query') query: string) {
    return this.animeSearchService.findByQuery(query);
  }
}
