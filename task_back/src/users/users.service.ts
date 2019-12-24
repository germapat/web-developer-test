import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import * as crypto from 'crypto'
import { CreateUserDto } from './dto/create-user.dto';
import { ErrorCode } from '../commons/ErrorCode';

@Injectable()
export class UsersService {
    constructor(@InjectModel('Users') private readonly userModel: Model<User>) { }

    async findByCredentials(email: string, password: string): Promise<User> {
        const conditions = {
            email,
            password: crypto.createHmac('sha256', password).digest('hex'),
        };
        return await this.userModel.findOne(conditions);
    }

    async findById(id: string): Promise<User> {
        return await this.userModel.findById(id);
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        let user = await this.userModel.findOne({ email: createUserDto.email }).exec()
        if (user) throw new ConflictException(ErrorCode.ExistingUserWithSameEmail);

        user = await this.userModel.findOne({ identification: createUserDto.identification, identificationType: createUserDto.identificationType }).exec()
        if (user) throw new ConflictException(ErrorCode.ExistingUserWithSameIdentification);

        user = new this.userModel(createUserDto);
        return await user.save();
    }
}
