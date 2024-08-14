import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from '../prisma.service';
import { Contact } from '@prisma/client';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    try {
      const category = await this.prisma.contact.create({
        data: createContactDto
      })
      return category
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAll() {
    return this.prisma.contact.findMany()
  }

  async findOne(id: string) {
    return this.prisma.contact.findUnique({
      where: {
        id: id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const category = await this.prisma.contact.findUnique({
        where: {
          id: id
        }
      })
      if (!category) {
        throw new NotFoundException(`Contact with ID ${id} not found`);
      }

      return this.prisma.contact.update({
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
    const category = await this.prisma.contact.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    return this.prisma.contact.delete({
      where: {
        id,
      },
    });
  }
}
