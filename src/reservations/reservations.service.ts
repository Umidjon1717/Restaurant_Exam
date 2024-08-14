import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from '../prisma.service';
import { Reservation } from '@prisma/client';


@Injectable()
export class ReservationsService{
  constructor(private readonly prisma: PrismaService){}

  async create(createReservationDto: CreateReservationDto):Promise<Reservation> {
    const reservation= await this.prisma.reservation.create({
      data:createReservationDto
    })
    return reservation
  }

  async findAll() {
    return this.prisma.reservation.findMany()
  }

  async findOne(id: string) {
    return this.prisma.reservation.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const reservation= await this.prisma.reservation.findUnique({
        where:{
          id:id
        }
      })
      if(!reservation){
        throw new NotFoundException(`reservation with ID ${id} not found`);      }

      return this.prisma.reservation.update({
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
    const reservation = await this.prisma.reservation.findUnique({
      where: {
        id,
      },
    });

    if (!reservation) {
      throw new NotFoundException(`reservation with ID ${id} not found`);
    }

    return this.prisma.reservation.delete({
      where: {
        id,
      },
    });
  }
}
