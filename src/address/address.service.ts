import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '../prisma.service';
import { Address } from '@prisma/client';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const address = await this.prisma.address.create({
      data: createAddressDto
    })
    return address
  }

  async findAll() {
    return this.prisma.address.findMany()
  }

  async findOne(id: string) {
    return this.prisma.address.findUnique({
      where: {
        id: id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const address = await this.prisma.address.findUnique({
        where: {
          id: id
        }
      })
      if (!address) {
        throw new NotFoundException(`Address with ID ${id} not found`);
      }

      return this.prisma.address.update({
        where: {
          id,
        },
        data,
      })


    } catch (error) {
      throw new error
    }
  }

  async remove(id: string) {
    const address = await this.prisma.address.findUnique({
      where: {
        id,
      },
    });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    return this.prisma.address.delete({
      where: {
        id,
      },
    });
  }
}
