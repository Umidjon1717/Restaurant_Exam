import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await this.prisma.category.create({
      data: createCategoryDto
    })
    return category
  }

  async findAll() {
    return this.prisma.category.findMany()
  }

  async findOne(id: string) {
    return this.prisma.category.findUnique({
      where: {
        id: id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          id: id
        }
      })
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      return this.prisma.category.update({
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
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
