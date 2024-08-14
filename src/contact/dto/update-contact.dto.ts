import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ContactType } from '@prisma/client';

export class UpdateContactDto extends PartialType(CreateContactDto) {
    @ApiProperty()
    @IsString()
    userId: string

    @ApiProperty({enum:['phone', 'email']})
    @IsString()
    type: ContactType

    @ApiProperty()
    @IsString()
    value: string
}
