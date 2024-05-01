import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Request } from '@nestjs/common';
import { PlaylistService } from '../services/playlist.service';
import { ExpressRequest } from 'src/middlewares/auth.middleware';
import { AnimePlayList } from 'src/types/AnimePlayList.type';
import { PlaylistDto } from 'src/dto/playlist.dto';
import { AnimeIdDto } from 'src/dto/anime-id.dto';
import { PlaylistItemDto } from 'src/dto/playlist-item.dto';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

    @Get("show")
    async getPlaylist(@Request() req: ExpressRequest) : Promise<PlaylistDto>{
      if(!req.user){
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      return await this.playlistService.getPlaylist(req.user._id);
    }

    @Post("add")
    async addPlaylist(@Request() req: ExpressRequest, @Body() animePlaylist: PlaylistItemDto) : Promise<PlaylistDto>{
      if(!req.user){
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      return await this.playlistService.addPlaylist(req.user._id, animePlaylist);
    }

    @Post("remove")
    async removePlaylist(@Request() req: ExpressRequest, @Body() animeId: AnimeIdDto) : Promise<PlaylistDto>{
      if(!req.user){
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      return await this.playlistService.removePlaylist(req.user._id, animeId); 
    }
}
