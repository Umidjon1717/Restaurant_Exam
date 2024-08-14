import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from '../prisma.service';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewService{
  constructor(private readonly prisma: PrismaService){}

  async create(createReviewDto: CreateReviewDto):Promise<Review> {
    const review= await this.prisma.review.create({
      data:createReviewDto
    })
    return review
  }

  async findAll() {
    return this.prisma.review.findMany()
  }

  async findOne(id: string) {
    return this.prisma.review.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const review= await this.prisma.review.findUnique({
        where:{
          id:id
        }
      })
      if(!review){
        throw new NotFoundException(`review with ID ${id} not found`);      }

      return this.prisma.review.update({
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
    const review = await this.prisma.review.findUnique({
      where: {
        id,
      },
    });

    if (!review) {
      throw new NotFoundException(`review with ID ${id} not found`);
    }

    return this.prisma.review.delete({
      where: {
        id,
      },
    });
  }
}
