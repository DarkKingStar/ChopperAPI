import { IsNotEmpty } from "class-validator";

export class PlaylistItemDto {
    @IsNotEmpty()
    animeId: string;
    
    title: string;
    
    poster: string;
    
    @IsNotEmpty()
    episodeId: string;
    
    @IsNotEmpty()
    episode: number;
    
    date: Date;
    
    @IsNotEmpty()
    playbackTime: number;
    
    duration: number;
    
    status: string;
}