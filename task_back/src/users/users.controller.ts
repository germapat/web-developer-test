import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findAll() {
        return await this.userService.findAll();
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<any> {
        return await this.userService.createUser(createUserDto);
    }
}
