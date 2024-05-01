import { IsNotEmpty } from "class-validator";
import { AnimePlayList } from "src/types/AnimePlayList.type";

export class PlaylistDto{

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    animePlaylist: AnimePlayList[];
}