import { Test, TestingModule } from '@nestjs/testing';
import { AnimeSearchController } from './anime-search.controller';
import { AnimeSearchService } from './anime-search.service';

describe('AnimeSearchController', () => {
  let controller: AnimeSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimeSearchController],
      providers: [AnimeSearchService],
    }).compile();

    controller = module.get<AnimeSearchController>(AnimeSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
