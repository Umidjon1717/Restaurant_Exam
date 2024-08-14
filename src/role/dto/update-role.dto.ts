import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { RoleName } from '@prisma/client';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @ApiProperty()
    @IsString()
    name: RoleName

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string
}
