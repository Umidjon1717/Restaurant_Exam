import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHappeningDto } from './dto/create-happening.dto';
import { UpdateHappeningDto } from './dto/update-happening.dto';
import { Happenings } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class HappeningsService{
  constructor(private readonly prisma: PrismaService){}

  async create(createEmployeeDto: CreateHappeningDto):Promise<Happenings> {
    const happenings= await this.prisma.happenings.create({
      data:createEmployeeDto
    })
    return happenings
  }

  async findAll() {
    return this.prisma.happenings.findMany()
  }

  async findOne(id: string) {
    return this.prisma.happenings.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const happenings= await this.prisma.happenings.findUnique({
        where:{
          id:id
        }
      })
      if(!happenings){
        throw new NotFoundException(`Happening with ID ${id} not found`);      }

      return this.prisma.happenings.update({
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
    const happenings = await this.prisma.happenings.findUnique({
      where: {
        id,
      },
    });

    if (!happenings) {
      throw new NotFoundException(`Happening with ID ${id} not found`);
    }

    return this.prisma.happenings.delete({
      where: {
        id,
      },
    });
  }
}

