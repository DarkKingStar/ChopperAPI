import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AnimePlayList } from "src/types/AnimePlayList.type";

@Schema()
export class Playlist {
    @Prop()
    userId: string;
    @Prop()
    animePlaylist: AnimePlayList[];
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist)