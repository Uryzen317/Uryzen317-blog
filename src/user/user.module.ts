import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
const dotenv = require('dotenv').config()

@Module({
  providers: [AuthService],
  controllers: [UserController],
  imports: [
    PrismaModule,
  ],
})
export class UserModule { }
