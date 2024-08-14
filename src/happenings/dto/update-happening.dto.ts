import { PartialType } from '@nestjs/mapped-types';
import { CreateHappeningDto } from './create-happening.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsUUID } from 'class-validator';

export class UpdateHappeningDto extends PartialType(CreateHappeningDto) {
    @ApiProperty()
    @IsString()
    title: string

    @ApiProperty()
    @IsUUID()
    @IsString()
    userId: string

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsDate()
    date: Date
}
