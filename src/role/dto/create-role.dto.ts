import { ApiProperty } from "@nestjs/swagger"
import { RoleName } from "@prisma/client"
import { IsOptional, IsString } from "class-validator"

export class CreateRoleDto {
    @ApiProperty()
    @IsString()
    name: RoleName

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string
}
