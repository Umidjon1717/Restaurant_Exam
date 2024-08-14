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
