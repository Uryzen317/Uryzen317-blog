import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { LoginDto } from './dtos/auth.dto';
import { AuthService } from './services/auth.service';

@Controller('user')
export class UserController {
    constructor(public authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() loginDto: LoginDto): Promise<{ accessToken: String }> {
        return this.authService.login(loginDto);
    }
}
