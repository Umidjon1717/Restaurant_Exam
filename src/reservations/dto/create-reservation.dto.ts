import { ApiProperty } from "@nestjs/swagger"
import { IsDataURI, IsDate, IsNumber, IsOptional, IsString, IsUUID } from "class-validator"

export class CreateReservationDto {
    @ApiProperty()
    @IsString()
    @IsUUID()
    userId: string

    @ApiProperty()
    @IsDate()
    dateTime: Date

    @ApiProperty()
    @IsNumber()
    numGuests: number

    @ApiProperty()
    @IsOptional()
    @IsString()
    specialRequest: string
}
