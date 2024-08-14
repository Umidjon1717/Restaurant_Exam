import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsString, IsUUID } from "class-validator"

export class CreateHappeningDto {
    @ApiProperty()
    @IsString()
    title: string

    
    @ApiProperty()
    @IsUUID()
    @IsString()
    userId: string

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsDate()
    date: Date
}
