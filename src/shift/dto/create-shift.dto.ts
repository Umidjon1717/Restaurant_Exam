import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsString } from "class-validator"

export class CreateShiftDto {
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
