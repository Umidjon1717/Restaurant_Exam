import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, IsUUID } from "class-validator"

export class CreateOrderMenuDto {
    @ApiProperty()
    @IsString()
    @IsUUID()
    orderId: string

    @ApiProperty()
    @IsString()
    @IsUUID()
    menuId: string

    @ApiProperty()
    @IsNumber()
    quantity: number
}
