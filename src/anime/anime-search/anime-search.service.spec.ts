import { Test, TestingModule } from '@nestjs/testing';
import { AnimeSearchService } from './anime-search.service';

describe('AnimeSearchService', () => {
  let service: AnimeSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimeSearchService],
    }).compile();

    service = module.get<AnimeSearchService>(AnimeSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
