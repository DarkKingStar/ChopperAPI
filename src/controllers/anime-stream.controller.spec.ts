import { Test, TestingModule } from '@nestjs/testing';
import { AnimeStreamController } from './anime-stream.controller';
import { AnimeStreamService } from '../services/anime-stream.service';

describe('AnimeStreamController', () => {
  let controller: AnimeStreamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimeStreamController],
      providers: [AnimeStreamService],
    }).compile();

    controller = module.get<AnimeStreamController>(AnimeStreamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
