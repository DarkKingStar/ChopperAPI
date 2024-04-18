import { Test, TestingModule } from '@nestjs/testing';
import { AnimeFetchService } from './anime-fetch.service';

describe('AnimeFetchService', () => {
  let service: AnimeFetchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimeFetchService],
    }).compile();

    service = module.get<AnimeFetchService>(AnimeFetchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
