import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateMenuCategoryDto {
    @ApiProperty()
    @IsString()
    menuId: string

    @ApiProperty()
    @IsString()
    categoryId: string
}
