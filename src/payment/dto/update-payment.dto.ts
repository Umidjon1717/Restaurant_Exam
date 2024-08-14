import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '@prisma/client';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
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
