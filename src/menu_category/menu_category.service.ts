import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuCategoryDto } from './dto/create-menu_category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu_category.dto';
import { PrismaService } from '../prisma.service';
import { MenuCategory } from '@prisma/client';


@Injectable()
export class MenuCategoryService{
  constructor(private readonly prisma: PrismaService){}

  async create(createMenuCategoryDto: CreateMenuCategoryDto):Promise<MenuCategory> {
    const menuCategory= await this.prisma.menuCategory.create({
      data:createMenuCategoryDto
    })
    return menuCategory
  }

  async findAll() {
    return this.prisma.menuCategory.findMany()
  }

  async findOne(id: string) {
    return this.prisma.menuCategory.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const menuCategory= await this.prisma.menuCategory.findUnique({
        where:{
          id:id
        }
      })
      if(!menuCategory){
        throw new NotFoundException(`MenuCategory with ID ${id} not found`);      }

      return this.prisma.menuCategory.update({
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
    const menuCategory = await this.prisma.menuCategory.findUnique({
      where: {
        id,
      },
    });

    if (!menuCategory) {
      throw new NotFoundException(`MenuCategory with ID ${id} not found`);
    }

    return this.prisma.menuCategory.delete({
      where: {
        id,
      },
    });
  }
}