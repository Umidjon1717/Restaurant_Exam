import { ApiProperty } from "@nestjs/swagger"
import { PaymentMethod, PaymentStatus } from "@prisma/client"
import { IsString, IsUUID } from "class-validator"

export class CreatePaymentDto {
    @ApiProperty()
    @IsUUID()
    @IsString()
    orderId: string

    @ApiProperty()
    @IsString()
    amount: string

    @ApiProperty({enum:["credit_card" ,"cash" , "online"]})
    @IsString()
    method: PaymentMethod

    @ApiProperty({enum:["paid" , "pending"]})
    @IsString()
    status: PaymentStatus

    @ApiProperty()
    @IsUUID()
    @IsString()
    userId: string
}
