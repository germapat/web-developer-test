import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
        private readonly configService: ConfigService
    ) { }

    getToken(id: string, email: string) {
        const user: JwtPayload = { id, email };
        const accessToken = this.jwtService.sign(user);
        const expiresIn = this.configService.get('TOKEN_EXPIRES_IN') || '1h';
        return { expiresIn, accessToken, user };
    }

    getUser(payload: JwtPayload): Promise<any> {
        return this.usersService.findById(payload.id);
    }
}
