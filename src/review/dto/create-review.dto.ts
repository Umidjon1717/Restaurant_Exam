import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, IsUUID } from "class-validator"

export class CreateReviewDto {
    @ApiProperty()
    @IsString()
    @IsUUID()
    userId: string

    @ApiProperty()
    @IsString()
    @IsUUID()
    menuId: string

    @ApiProperty()
    @IsNumber()
    rating: number

    @ApiProperty()
    @IsString()
    comment: string
}
