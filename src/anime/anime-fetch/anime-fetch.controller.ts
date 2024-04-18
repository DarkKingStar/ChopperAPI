import { Controller, Get, Param, Query } from '@nestjs/common';
import { AnimeFetchService } from './anime-fetch.service';

@Controller('anime/list')
export class AnimeFetchController {

  constructor(private readonly animeFetchService: AnimeFetchService) {}

  
  @Get('latest')
  getLatestAnime() {
    return this.animeFetchService.getLatestAnime();
  }

  @Get('popular')
  getPopularAnime() {
    return this.animeFetchService.getPopularAnime();
  }

  @Get('new')
  getNewAnime() {
    return this.animeFetchService.getNewAnime();
  } 

  @Get('movies')
  getMovies() {
    return this.animeFetchService.getMovies();
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
