import { Module } from '@nestjs/common';
import { HappeningsService } from './happenings.service';
import { HappeningsController } from './happenings.controller';
import { PrismaService } from '../prisma.service';


@Module({
  controllers: [HappeningsController],
  providers: [HappeningsService, PrismaService]
})
export class HappeningsModule {}
