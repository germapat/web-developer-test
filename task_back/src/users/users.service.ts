import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import * as crypto from 'crypto'
import { CreateUserDto } from './dto/create-user.dto';
import { ErrorCode } from '../commons/ErrorCode';
import { ConfigService } from '../config/config.service';
const config = new ConfigService();
const sendEmail = require('send-email');

@Injectable()
export class UsersService {
    constructor(@InjectModel('Users') private readonly userModel: Model<User>
    ) { }

    async findByCredentials(email: string, password: string): Promise<User> {
        const conditions = {
            email: email,
            password: crypto.createHmac('sha256', password).digest('hex'),
            registerStatus: "3"

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
        const dotenv = require('dotenv');
        dotenv.config();
        let user = await this.userModel.findOne({ email: createUserDto.email }).exec()
        if (user) throw new ConflictException(ErrorCode.ExistingUserWithSameEmail);

        user = await this.userModel.findOne({ identification: createUserDto.identification, identificationType: createUserDto.identificationType }).exec()
        if (user) throw new ConflictException(ErrorCode.ExistingUserWithSameIdentification);

        user = new this.userModel(createUserDto);
        let insertData = await user.save();
        if (!insertData.identificationType) throw new ConflictException(ErrorCode.ErrorSaveUser);
        let payload = {
            "to": user.email,
            "subject": "User registration",
            "html": `<a href='${config.get("URL_REDIRECT_REGISTRATION") + user.identification + '&&identification=' + user.identificationType}' target='_blank'>Hello 
            Welcome, click on the link to continue with the registration ! </a>`,
            "from": "Register: <ductuscorporation@gmail.com>"
        }
        sendEmail(payload)
            .then((res) => {
                if (res.accepted.length < 1) {
                    user.registerStatus = "2"
                    user.save()
                }
            })
        return user
    }
    async confirmRegistration(confirmRegistrationDto) {
        let user = await this.userModel.findOne({ identification: confirmRegistrationDto.code, identificationType: confirmRegistrationDto.identificationType }).exec()
        if (!user) throw new NotFoundException(ErrorCode.UserNotFound);
        return await user.update({registerStatus: "3"})
    }
}
