import { Module } from '@nestjs/common';
import { AnimeDetailsService } from '../services/anime-details.service';
import { AnimeDetailsController } from '../controllers/anime-details.controller';

@Module({
  controllers: [AnimeDetailsController],
  providers: [AnimeDetailsService],
})
export class AnimeDetailsModule {}
