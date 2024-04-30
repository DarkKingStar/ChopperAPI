import { Module } from '@nestjs/common';
import { AnimeFetchService } from '../services/anime-fetch.service';
import { AnimeFetchController } from '../controllers/anime-fetch.controller';

@Module({
  controllers: [AnimeFetchController],
  providers: [AnimeFetchService],
})
export class AnimeFetchModule {}
