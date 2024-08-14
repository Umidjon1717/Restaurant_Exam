import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user_address.dto';
import { UpdateUserAddressDto } from './dto/update-user_address.dto';
import { PrismaService } from '../prisma.service';
import { UserAddress } from '@prisma/client';

@Injectable()
export class UserAddressService{
  constructor(private readonly prisma: PrismaService){}

  async create(createUserAddressDto: CreateUserAddressDto):Promise<UserAddress> {
    const userAddress= await this.prisma.userAddress.create({
      data:createUserAddressDto
    })
    return userAddress
  }

  async findAll() {
    return this.prisma.userAddress.findMany()
  }

  async findOne(id: string) {
    return this.prisma.userAddress.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const userAddress= await this.prisma.userAddress.findUnique({
        where:{
          id:id
        }
      })
      if(!userAddress){
        throw new NotFoundException(`userAddress with ID ${id} not found`);      }

      return this.prisma.userAddress.update({
        where:{
          id,
        },
        data,
      })
      
      
    } catch (error) {
      throw new error
    }
  }

  async remove(id: string) {
    const userAddress = await this.prisma.userAddress.findUnique({
      where: {
        id,
      },
    });

    if (!userAddress) {
      throw new NotFoundException(`userAddress with ID ${id} not found`);
    }

    return this.prisma.userAddress.delete({
      where: {
        id,
      },
    });
  }
}
