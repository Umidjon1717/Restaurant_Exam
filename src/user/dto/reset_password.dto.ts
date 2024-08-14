import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class resetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  newPassword: string
}