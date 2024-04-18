import { Controller, Get, Param } from '@nestjs/common';
import { AnimeDetailsService } from './anime-details.service';

@Controller('info')
export class AnimeDetailsController {
  constructor(private readonly animeDetailsService: AnimeDetailsService) {}

  @Get(':animeid')
  getAnimeDetails(@Param ('animeid') animeid: string) {   
    return this.animeDetailsService.getAnimeDetails(animeid);
  } 
}
