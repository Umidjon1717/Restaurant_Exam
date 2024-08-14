import { PartialType } from '@nestjs/mapped-types';
import { CreateShiftDto } from './create-shift.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class UpdateShiftDto extends PartialType(CreateShiftDto) {
    @ApiProperty()
    @IsString()
    employeeId: string

    @ApiProperty()
    @IsDate()
    startTime: Date

    @ApiProperty()
    @IsDate()
    endTime: Date
}
