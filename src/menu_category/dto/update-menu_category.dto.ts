import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuCategoryDto } from './create-menu_category.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateMenuCategoryDto extends PartialType(CreateMenuCategoryDto) {
    @ApiProperty()
    @IsString()
    menuId: string

    @ApiProperty()
    @IsString()
    categoryId: string
}
