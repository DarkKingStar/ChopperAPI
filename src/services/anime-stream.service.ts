import { Injectable } from '@nestjs/common';

@Injectable()
export class AnimeStreamService {
  getAnimeStream(animeid: string, episodeid: string) {
    throw new Error('Method not implemented.');
  }
}
