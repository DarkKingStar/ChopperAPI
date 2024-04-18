import { Injectable } from '@nestjs/common';

@Injectable()
export class AnimeSearchService {
  findByQuery(query : string) {
    throw new Error('Method not implemented.');
  }
}
