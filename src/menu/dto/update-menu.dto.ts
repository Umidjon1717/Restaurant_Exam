import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    file_id:string

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string

    @ApiProperty()
    @IsString()
    price: string
}
