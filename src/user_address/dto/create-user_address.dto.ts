import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsUUID } from "class-validator"

export class CreateUserAddressDto {
    @ApiProperty()
    @IsString()
    @IsUUID()
    userId: string

    @ApiProperty()
    @IsString()
    @IsUUID()
    addressId: string
}
