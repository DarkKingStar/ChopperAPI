import { Controller, Get, Param, Query } from '@nestjs/common';
import { AnimeFetchService } from '../services/anime-fetch.service';

@Controller('anime/fetch')
export class AnimeFetchController {

  constructor(private readonly animeFetchService: AnimeFetchService) {}

  
  @Get('latest')
  getLatestAnime(@Query('page') page: number) {
    return this.animeFetchService.getLatestAnime(page);
  }

  @Get('popular')
  getPopularAnime(@Query('page') page: number) {
    return this.animeFetchService.getPopularAnime(page);
  }

  @Get('new')
  getNewAnime(@Query('page') page: number) {
    return this.animeFetchService.getNewAnime(page);
  } 

  @Get('movies')
  getMovies(@Query('page') page: number) {
    return this.animeFetchService.getMovies(page);
  }

  @Get('genres')
  getGenres() {
    return this.animeFetchService.getGenres();
  }

  @Get('genre/:genre')
  getAnimeByGenre(@Param('genre') genre: string, @Query('page') page: number) {
    return this.animeFetchService.getAnimeByGenre(genre, page);
  } 
}
