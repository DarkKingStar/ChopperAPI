import { Controller, Get, Param } from '@nestjs/common';
import { AnimeStreamService } from '../services/anime-stream.service';

@Controller('watch')
export class AnimeStreamController {
  constructor(private readonly animeStreamService: AnimeStreamService) {}

  @Get(":episodeid")
  getAnimeStream(@Param('episodeid') episodeid: string) {
    return this.animeStreamService.getAnimeStream(episodeid);
  }
}
