import { Module } from '@nestjs/common';
import { PlaylistService } from '../services/playlist.service';
import { PlaylistController } from '../controllers/playlist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlist, PlaylistSchema } from 'src/entities/playlist.entity';

@Module({
  imports : [MongooseModule.forFeature([{ name: Playlist.name, schema: PlaylistSchema }])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
