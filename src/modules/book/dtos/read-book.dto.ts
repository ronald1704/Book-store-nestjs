import { Exclude, Expose, Type } from "class-transformer";
import { IsEmail, IsNumber } from "class-validator";
import { ReadUserDto } from "../../../modules/user/dto";

@Exclude()
export class ReadBookDto {
    @Expose()
    @IsNumber()
    readonly id: number;

    @Expose()
    @IsEmail()
    readonly name: string;

    @Expose()
    @IsEmail()
    readonly description: string;

    @Expose()
    @Type(type => ReadUserDto)
    readonly details: ReadUserDto[];
}