import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderMenuDto } from './create-order_menu.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class UpdateOrderMenuDto extends PartialType(CreateOrderMenuDto) {
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
