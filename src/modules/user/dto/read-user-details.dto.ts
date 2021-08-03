import { Exclude, Expose, Type } from "class-transformer";
import { IsString } from "class-validator";

@Exclude()
export class ReadUserDetailDto {
    @Expose()
    @IsString()
    readonly name: string;

    @Expose()
    @IsString()
    readonly lastname: string;
}