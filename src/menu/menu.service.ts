import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from '../prisma.service';
import { Menu, Prisma } from '@prisma/client';

@Injectable()
export class MenuService{
  constructor(private readonly prisma: PrismaService){}

  async create(createMenuDto: CreateMenuDto):Promise<Menu> {
    const menu= await this.prisma.menu.create({
      data:createMenuDto
    })
    return menu
  }

  async findAll(query: {
    filter?: string;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }) {
    const { filter, order, page = 1, limit = 10 } = query;

    const where: Prisma.MenuWhereInput = filter
      ? {
        OR: [
          { name: { contains: filter, mode: 'insensitive' } },
        ],
      }
      : {};


    const total = await this.prisma.menu.count();

    const items = await this.prisma.menu.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {}
    });

    return { total, items };
  }

  async findOne(id: string) {
    return this.prisma.menu.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const menu= await this.prisma.menu.findUnique({
        where:{
          id:id
        }
      })
      if(!menu){
        throw new NotFoundException(`Menu with ID ${id} not found`);      }

      return this.prisma.menu.update({
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
    const menu = await this.prisma.menu.findUnique({
      where: {
        id,
      },
    });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return this.prisma.menu.delete({
      where: {
        id,
      },
    });
  }
}

