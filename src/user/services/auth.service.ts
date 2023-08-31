import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from '../dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(public jwtService: JwtService, public prismaService: PrismaService) { }

    async login(loginDto: LoginDto): Promise<{ accessToken: String }> {
        let { username, password } = loginDto,
            accessToken;

        let user = await this.prismaService.user.findUnique({
            where: {
                username, password
            }
        });
        if (!user) throw new BadRequestException();

        try {
            accessToken = await this.jwtService.signAsync({ id: user.id }, { expiresIn: '1d' });
        } catch (err) { throw new BadRequestException() }
        return { accessToken };
    }
}
