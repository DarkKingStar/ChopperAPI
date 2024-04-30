import { Test, TestingModule } from '@nestjs/testing';
import { AnimeStreamService } from './anime-stream.service';

describe('AnimeStreamService', () => {
  let service: AnimeStreamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimeStreamService],
    }).compile();

    service = module.get<AnimeStreamService>(AnimeStreamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
