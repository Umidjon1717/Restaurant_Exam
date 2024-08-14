import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class CreateMenuDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty({default:null})
    @IsOptional()
    file_id:string

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string

    @ApiProperty()
    @IsString()
    price: string
}
