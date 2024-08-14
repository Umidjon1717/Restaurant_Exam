import { ApiProperty } from '@nestjs/swagger'
import {IsString} from 'class-validator'
export class CreateAddressDto {
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
