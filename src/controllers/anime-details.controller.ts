import { Controller, Get, Param, Query } from '@nestjs/common';
import { AnimeDetailsService } from '../services/anime-details.service';

@Controller('info')
export class AnimeDetailsController {
  constructor(private readonly animeDetailsService: AnimeDetailsService) {}

  @Get(':animeid')
  getAnimeDetails(@Param('animeid') animeid: string) {
    return this.animeDetailsService.getAnimeDetails(animeid);
  }

  @Get(':animeid/episodes')
  getAnimeEpisodes(
    @Param('animeid') animeid: string,
    @Query('page') page: number,
    @Query('rows') rows: number,
    @Query('id') id?: number,
  ) {
    return this.animeDetailsService.getAnimeEpisodes(animeid, page, rows, id);
  }
}
