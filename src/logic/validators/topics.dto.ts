import { IsNotEmpty, IsString } from "class-validator";

export class CreateTopicDTO {
    @IsString()
    @IsNotEmpty()
    title: string;
}