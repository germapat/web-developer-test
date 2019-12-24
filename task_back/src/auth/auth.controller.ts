import { Controller, Post, Body, NotFoundException, Get, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RequestTokenDto } from './dto/request-token.dto';
import { ErrorCode } from '../commons/ErrorCode';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) { }

    @Post('request-token')
    async requestToken(@Body() requestTokenDto: RequestTokenDto) {
        const user = await this.usersService.findByCredentials(
            requestTokenDto.email,
            requestTokenDto.password
        );

        if (!user)
            throw new NotFoundException(ErrorCode.UserNotFound);

        return await this.authService.getToken(user.id, user.email);
    }

    @Get('data')
    @UseGuards(AuthGuard())
    findAll() {
        return 'You are authenticated.'
    }
}
