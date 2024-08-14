import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator"


export class SignUpAuthDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar_id:string

  @ApiProperty()
  @IsString()
  @IsStrongPassword()
  password: string

  @ApiProperty()
  @IsString()
  firstName: string

  @ApiProperty()
  @IsString()
  lastName: string

  @ApiProperty()
  @IsString()
  @IsPhoneNumber()
  phoneNumber: string
}