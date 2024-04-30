import { Test, TestingModule } from '@nestjs/testing';
import { AnimeDetailsService } from './anime-details.service';

describe('AnimeDetailsService', () => {
  let service: AnimeDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimeDetailsService],
    }).compile();

    service = module.get<AnimeDetailsService>(AnimeDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
