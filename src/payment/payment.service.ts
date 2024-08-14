import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from '../prisma.service';
import { Payment } from '@prisma/client';

@Injectable()
export class PaymentService{
  constructor(private readonly prisma: PrismaService){}

  async create(createOrderDto: CreatePaymentDto):Promise<Payment> {
    const payment= await this.prisma.payment.create({
      data:createOrderDto
    })
    return payment
  }

  async findAll() {
    return this.prisma.payment.findMany()
  }

  async findOne(id: string) {
    return this.prisma.payment.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const payment= await this.prisma.payment.findUnique({
        where:{
          id:id
        }
      })
      if(!payment){
        throw new NotFoundException(`payment with ID ${id} not found`);      }

      return this.prisma.payment.update({
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
    const payment = await this.prisma.payment.findUnique({
      where: {
        id,
      },
    });

    if (!payment) {
      throw new NotFoundException(`payment with ID ${id} not found`);
    }

    return this.prisma.payment.delete({
      where: {
        id,
      },
    });
  }
}
