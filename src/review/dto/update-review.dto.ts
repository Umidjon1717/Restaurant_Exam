import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
    @ApiProperty()
    @IsString()
    @IsUUID()
    userId: string

    @ApiProperty()
    @IsString()
    @IsUUID()
    menuId: string

    @ApiProperty()
    @IsNumber()
    rating: number

    @ApiProperty()
    @IsString()
    comment: string
}
