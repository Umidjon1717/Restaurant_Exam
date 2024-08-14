import { Module } from '@nestjs/common';
import { OrderMenuService } from './order_menu.service';
import { OrderMenuController } from './order_menu.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [OrderMenuController],
  providers: [OrderMenuService, PrismaService]
})
export class OrderMenuModule {}
