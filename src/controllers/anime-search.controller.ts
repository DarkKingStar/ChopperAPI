import { Controller, Get, Param } from '@nestjs/common';
import { AnimeSearchService } from '../services/anime-search.service';

@Controller('search')
export class AnimeSearchController {
  constructor(private readonly animeSearchService: AnimeSearchService) {}

  @Get("/:query")
  findByQuery(@Param('query') query: string) {
    return this.animeSearchService.findByQuery(query);
  }
}
