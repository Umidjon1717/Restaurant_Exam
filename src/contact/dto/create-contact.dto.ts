import { ApiProperty } from "@nestjs/swagger"
import { ContactType } from "@prisma/client"
import { IsString } from "class-validator"

export class CreateContactDto {
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
