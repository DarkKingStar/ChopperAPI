import { Module } from '@nestjs/common';
import { AnimeStreamService } from './anime-stream.service';
import { AnimeStreamController } from './anime-stream.controller';

@Module({
  controllers: [AnimeStreamController],
  providers: [AnimeStreamService],
})
export class AnimeStreamModule {}
