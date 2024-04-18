import { Controller, Get, Param } from '@nestjs/common';
import { AnimeStreamService } from './anime-stream.service';

@Controller('watch')
export class AnimeStreamController {
  constructor(private readonly animeStreamService: AnimeStreamService) {}

  @Get(":animeid/:episodeid")
  getAnimeStream(@Param('animeid') animeid: string, @Param('episodeid') episodeid: string) {
    return this.animeStreamService.getAnimeStream(animeid, episodeid);
  }
}
