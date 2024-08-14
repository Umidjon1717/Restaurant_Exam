import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService{
  constructor(private readonly prisma: PrismaService){}

  async create(createOrderDto: CreateOrderDto):Promise<Order> {
    const order= await this.prisma.order.create({
      data:createOrderDto
    })
    return order
  }

  async findAll() {
    return this.prisma.order.findMany()
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const order= await this.prisma.order.findUnique({
        where:{
          id:id
        }
      })
      if(!order){
        throw new NotFoundException(`order with ID ${id} not found`);      }

      return this.prisma.order.update({
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
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      throw new NotFoundException(`order with ID ${id} not found`);
    }

    return this.prisma.order.delete({
      where: {
        id,
      },
    });
  }
}
