import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsPhoneNumber, IsString } from "class-validator"

export class CreateEmployeeDto {
    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    lastName: string

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    @IsPhoneNumber()
    phoneNumber: string

    @ApiProperty()
    @IsString()
    roleId: string
}
