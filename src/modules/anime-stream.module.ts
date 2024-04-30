import { Module } from '@nestjs/common';
import { AnimeStreamService } from '../services/anime-stream.service';
import { AnimeStreamController } from '../controllers/anime-stream.controller';

@Module({
  controllers: [AnimeStreamController],
  providers: [AnimeStreamService],
})
export class AnimeStreamModule {}
