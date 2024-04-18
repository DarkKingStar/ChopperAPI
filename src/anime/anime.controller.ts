import { Controller, Get, Param } from '@nestjs/common';
import { AnimeService } from './anime.service';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {
  }

  @Get()
  getAnimeWelcome() {
    return this.animeService.getAnimeWelcome();
  }
}
