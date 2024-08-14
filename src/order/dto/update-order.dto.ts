import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiProperty()
    @IsString()
    userId: string

    @ApiProperty()
    @IsString()
    totalPrice: string

    @ApiProperty({enum:['pending', 'completed', 'cancelled']})
    @IsString()
    status: OrderStatus
}
