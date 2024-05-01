import { IsNotEmpty } from "class-validator";

export class AnimeIdDto {
    @IsNotEmpty()
    animeId: string
}