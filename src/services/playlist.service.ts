import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnimeIdDto } from 'src/dto/anime-id.dto';
import { PlaylistItemDto } from 'src/dto/playlist-item.dto';
import { PlaylistDto } from 'src/dto/playlist.dto';
import { Playlist } from 'src/entities/playlist.entity';
import { AnimePlayList } from 'src/types/AnimePlayList.type';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<Playlist>,
  ) {}

  async getPlaylist(id: string): Promise<PlaylistDto> {
    const playlist = await this.playlistModel.findOne({ userId: id });
    return playlist;
  }

  async addPlaylist(id: string, playlist: PlaylistItemDto): Promise<PlaylistDto> {
    try {
      const myplaylist = await this.playlistModel.findOne({ userId: id });
      if (!myplaylist) {
        const newPlaylist = new this.playlistModel({
          userId: id,
          animePlaylist: [playlist],
        });
        return await newPlaylist.save();
      } else {
        if (
          myplaylist.animePlaylist.filter(anime=>  anime.animeId === playlist.animeId).length === 0
        ) {
          myplaylist.animePlaylist.push(playlist);
          return await myplaylist.save();
        } else {
          myplaylist.animePlaylist = myplaylist.animePlaylist.filter(
            (anime) => {
              return anime.animeId !== playlist.animeId;
            },
          );
          myplaylist.animePlaylist.unshift(playlist);
          return await myplaylist.save();
        }
      }
    } catch (err) {
        throw new HttpException('Playlist cannot be added/updated', HttpStatus.CONFLICT);
    }
  }

  async removePlaylist(userId: string, animeIdDto: AnimeIdDto): Promise<PlaylistDto> {
    try {
      const myplaylist = await this.playlistModel.findOne({ userId: userId });
      if (myplaylist && myplaylist.animePlaylist.length > 0 && myplaylist.animePlaylist.filter(anime=>  anime.animeId === animeIdDto.animeId).length !== 0) {
        myplaylist.animePlaylist = myplaylist.animePlaylist.filter(
          (anime) => {
            return anime.animeId !== animeIdDto.animeId;
          },
        );
        return await myplaylist.save();
      }else{
        return myplaylist;
      }
    } catch (err) {
        throw new HttpException('anime from the playlist cannot be deleted', HttpStatus.CONFLICT);
    }
  }
}
