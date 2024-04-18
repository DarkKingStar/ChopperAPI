import { Module } from '@nestjs/common';
import { AnimeFetchService } from './anime-fetch.service';
import { AnimeFetchController } from './anime-fetch.controller';

@Module({
  controllers: [AnimeFetchController],
  providers: [AnimeFetchService],
})
export class AnimeFetchModule {}
