import { Module } from '@nestjs/common';
import { UserAddressService } from './user_address.service';
import { UserAddressController } from './user_address.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [UserAddressController],
  providers: [UserAddressService, PrismaService]
})
export class UserAddressModule {}
