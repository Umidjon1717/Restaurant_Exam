import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { PrismaService } from '../prisma.service';
import { Shift } from '@prisma/client';

@Injectable()
export class ShiftService{
  constructor(private readonly prisma: PrismaService){}

  async create(createShiftDto: CreateShiftDto):Promise<Shift> {
    const shift= await this.prisma.shift.create({
      data:createShiftDto
    })
    return shift
  }

  async findAll() {
    return this.prisma.shift.findMany()
  }

  async findOne(id: string) {
    return this.prisma.shift.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const shift= await this.prisma.shift.findUnique({
        where:{
          id:id
        }
      })
      if(!shift){
        throw new NotFoundException(`shift with ID ${id} not found`);      }

      return this.prisma.shift.update({
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
    const shift = await this.prisma.shift.findUnique({
      where: {
        id,
      },
    });

    if (!shift) {
      throw new NotFoundException(`shift with ID ${id} not found`);
    }

    return this.prisma.shift.delete({
      where: {
        id,
      },
    });
  }
}
