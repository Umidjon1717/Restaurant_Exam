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

    @ApiProperty({enum:["CREDIT_CARD" ,"CASH" , "ONLINE"]})
    @IsString()
    method: PaymentMethod

    @ApiProperty({enum:["PAID" , "PENDING"]})
    @IsString()
    status: PaymentStatus

    @ApiProperty()
    @IsUUID()
    @IsString()
    userId: string
}
