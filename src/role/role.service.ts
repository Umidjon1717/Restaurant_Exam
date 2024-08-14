import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class RoleService{
  constructor(private readonly prisma: PrismaService){}

  async create(createRoleDto: CreateRoleDto):Promise<Role> {
    const role= await this.prisma.role.create({
      data:createRoleDto
    })
    return role
  }

  async findAll() {
    return this.prisma.role.findMany()
  }

  async findOne(id: string) {
    return this.prisma.role.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const role= await this.prisma.role.findUnique({
        where:{
          id:id
        }
      })
      if(!role){
        throw new NotFoundException(`role with ID ${id} not found`);      }

      return this.prisma.role.update({
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
    const role = await this.prisma.role.findUnique({
      where: {
        id,
      },
    });

    if (!role) {
      throw new NotFoundException(`role with ID ${id} not found`);
    }

    return this.prisma.role.delete({
      where: {
        id,
      },
    });
  }
}
