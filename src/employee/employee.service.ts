import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '../prisma.service';
import { CreateContactDto } from '../contact/dto/create-contact.dto';
import { Employee } from '@prisma/client';

@Injectable()
export class EmployeeService{
  constructor(private readonly prisma: PrismaService){}

  async create(createEmployeeDto: CreateEmployeeDto):Promise<Employee> {
    const category= await this.prisma.employee.create({
      data:createEmployeeDto
    })
    return category
  }

  async findAll() {
    return this.prisma.employee.findMany()
  }

  async findOne(id: string) {
    return this.prisma.employee.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const category= await this.prisma.employee.findUnique({
        where:{
          id:id
        }
      })
      if(!category){
        throw new NotFoundException(`Employee with ID ${id} not found`);      }

      return this.prisma.employee.update({
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
    const category = await this.prisma.employee.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return this.prisma.employee.delete({
      where: {
        id,
      },
    });
  }
}
