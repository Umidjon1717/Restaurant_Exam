import { ApiProperty } from "@nestjs/swagger"
import { OrderStatus } from "@prisma/client"
import { IsString } from "class-validator"

export class CreateOrderDto {
    @ApiProperty()
    @IsString()
    userId: string

    @ApiProperty()
    @IsString()
    totalPrice: string

    @ApiProperty({enum:['PENDING', 'COMPLETED', 'CANCELLED']})
    @IsString()
    status: OrderStatus
}
