import { Injectable } from '@nestjs/common';

@Injectable()
export class AnimeService {
  getAnimeWelcome() {
    return "Hello Choppper";    
  }
    
}
