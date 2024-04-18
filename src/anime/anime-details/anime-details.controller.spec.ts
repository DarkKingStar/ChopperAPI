import { Test, TestingModule } from '@nestjs/testing';
import { AnimeDetailsController } from './anime-details.controller';
import { AnimeDetailsService } from './anime-details.service';

describe('AnimeDetailsController', () => {
  let controller: AnimeDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimeDetailsController],
      providers: [AnimeDetailsService],
    }).compile();

    controller = module.get<AnimeDetailsController>(AnimeDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
