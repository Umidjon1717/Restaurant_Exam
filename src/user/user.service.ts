import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import * as nodemailer from 'nodemailer'
import { SignUpAuthDto } from './dto/sign_up.dto';
import { Prisma } from '@prisma/client';
import { SignInAuthDto } from './dto/sign_in.dto';
import { forgetPasswordDto } from './dto/forget_password.dto';
import { resetPasswordDto } from './dto/reset_password.dto';
import * as crypto from 'crypto';



@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  private generatePassword(length: number = 16): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    const charsetLength = charset.length;
    let password = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(charsetLength);
      password += charset[randomIndex];
    }

    return password;
  }

  async RefreshToken(payload: Record<string, any>): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET || '12345',
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '15h',
    });
    return token;
  }

  async AccessToken(payload: Record<string, any>): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET || '12345',
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
    });
    return token;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(createAuthDto: SignUpAuthDto): Promise<Omit<Prisma.UserCreateInput, 'password'>> {
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...createAuthDto,
        password: hashedPassword,
      },
    });
    const { password, ...result } = user;
    return result;
  }

  async signIn(signInDto: SignInAuthDto): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: signInDto.email },
    });

    if (!user || !(await bcrypt.compare(signInDto.password, user.password))) {
      throw new NotFoundException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = await this.AccessToken(payload);
    const refreshToken = await this.RefreshToken(payload);

    return { accessToken, refreshToken };
  }

  async forgetPassword(forgetPasswordDto: forgetPasswordDto): Promise<{ message: string }> {
    const email = forgetPasswordDto.email;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newPassword = this.generatePassword(16);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { email },
      data: { password: hashedPassword, resetToken: null, resetTokenExpiry: null },
    });

    const transporter = nodemailer.createTransport({
      service: 'ethereal',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Password Reset Request',
      html: `Hi there,<br><br>Your new password is: <strong>${newPassword}</strong><br><br>Please log in with this password and change it immediately.<br><br>Best regards,<br>[Your Company]`,
    });

    return { message: 'Password reset email sent' };
  }

  async resetPassword(resetPasswordDto: resetPasswordDto): Promise<{ message: string }> {
    const email = resetPasswordDto.email;
    const newPassword = resetPasswordDto.newPassword;
    const userInput = await this.prisma.user.findFirst({ where: { email } });

    if (!userInput) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: userInput.id },
      data: { password: hashedPassword, resetToken: null, resetTokenExpiry: null },
    });

    return { message: 'Password successfully reset' };
  }

  async findAll(query: {
    filter?: string;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }) {
    const { filter, order, page = 1, limit = 10 } = query;

    const where: Prisma.UserWhereInput = filter
      ? {
        OR: [
          { email: { contains: filter, mode: 'insensitive' } },
        ],
      }
      : {};


    const total = await this.prisma.user.count();

    const items = await this.prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {}
    });

    return { total, items };
  }


  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateAuthDto: SignInAuthDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateAuthDto,
    });
    return user;
  }

  async remove(id: string) {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return user;
  }
}