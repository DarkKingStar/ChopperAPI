import { Test, TestingModule } from '@nestjs/testing';
import { AnimeFetchController } from './anime-fetch.controller';
import { AnimeFetchService } from './anime-fetch.service';

describe('AnimeFetchController', () => {
  let controller: AnimeFetchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimeFetchController],
      providers: [AnimeFetchService],
    }).compile();

    controller = module.get<AnimeFetchController>(AnimeFetchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
