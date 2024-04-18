import { Module } from '@nestjs/common';
import { AnimeDetailsService } from './anime-details.service';
import { AnimeDetailsController } from './anime-details.controller';

@Module({
  controllers: [AnimeDetailsController],
  providers: [AnimeDetailsService],
})
export class AnimeDetailsModule {}
