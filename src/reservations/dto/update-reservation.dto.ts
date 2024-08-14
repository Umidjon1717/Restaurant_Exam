import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
    @ApiProperty()
    @IsString()
    @IsUUID()
    userId: string

    @ApiProperty()
    @IsDate()
    dateTime: Date

    @ApiProperty()
    @IsNumber()
    numGuests: number

    @ApiProperty()
    @IsOptional()
    @IsString()
    specialRequest: string
}
