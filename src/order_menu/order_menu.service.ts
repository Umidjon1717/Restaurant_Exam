import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderMenuDto } from './dto/create-order_menu.dto';
import { UpdateOrderMenuDto } from './dto/update-order_menu.dto';
import { PrismaService } from '../prisma.service';
import { OrderMenu } from '@prisma/client';

@Injectable()
export class OrderMenuService{
  constructor(private readonly prisma: PrismaService){}

  async create(createOrderDto: CreateOrderMenuDto):Promise<OrderMenu> {
    const orderMenu= await this.prisma.orderMenu.create({
      data:createOrderDto
    })
    return orderMenu
  }

  async findAll() {
    return this.prisma.orderMenu.findMany()
  }

  async findOne(id: string) {
    return this.prisma.orderMenu.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const orderMenu= await this.prisma.orderMenu.findUnique({
        where:{
          id:id
        }
      })
      if(!orderMenu){
        throw new NotFoundException(`orderMenu with ID ${id} not found`);      }

      return this.prisma.orderMenu.update({
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
    const orderMenu = await this.prisma.orderMenu.findUnique({
      where: {
        id,
      },
    });

    if (!orderMenu) {
      throw new NotFoundException(`orderMenu with ID ${id} not found`);
    }

    return this.prisma.orderMenu.delete({
      where: {
        id,
      },
    });
  }
}
