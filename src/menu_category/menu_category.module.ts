import { Module } from '@nestjs/common';
import { MenuCategoryService } from './menu_category.service';
import { MenuCategoryController } from './menu_category.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [MenuCategoryController],
  providers: [MenuCategoryService, PrismaService]
})
export class MenuCategoryModule {}
