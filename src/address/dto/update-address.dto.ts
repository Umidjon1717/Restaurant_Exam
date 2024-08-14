import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create-address.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
    @ApiProperty()
    @IsString()
    street:string

    @ApiProperty()
    @IsString()
    city:string

    @ApiProperty()
    @IsString()
    state:string

    @ApiProperty()
    @IsString()
    country:string

    @ApiProperty()
    @IsString()
    postcode:string
}
