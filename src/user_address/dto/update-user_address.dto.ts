import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAddressDto } from './create-user_address.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class UpdateUserAddressDto extends PartialType(CreateUserAddressDto) {
    @ApiProperty()
    @IsString()
    @IsUUID()
    userId: string

    @ApiProperty()
    @IsString()
    @IsUUID()
    addressId: string
}
