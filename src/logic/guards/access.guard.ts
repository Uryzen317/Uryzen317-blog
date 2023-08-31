import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(public prismaService: PrismaService, public jwtService: JwtService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    let accessToken = context.switchToHttp().getRequest().headers['accesstoken'];
    try {
      accessToken = await this.jwtService.verifyAsync(accessToken);
    } catch (err) { throw new BadRequestException() };
    if (!accessToken) throw new BadRequestException();

    let user = await this.prismaService.user.findUnique({ where: { id: accessToken.id, username: accessToken.username } });
    if (!user) throw new BadRequestException();

    context.switchToHttp().getRequest().user = user;
    return true;
  }
}
