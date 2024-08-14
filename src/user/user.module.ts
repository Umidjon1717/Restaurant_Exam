import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './common/strategy/access.strategy';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_ACCESS_SECRET || '12345',
    signOptions: { expiresIn: '60m' },
  })],
  controllers: [UserController],
  providers: [UserService, PrismaService, AccessTokenStrategy]
})
export class UserModule { }
