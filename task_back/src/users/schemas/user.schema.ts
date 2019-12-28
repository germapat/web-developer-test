import { Schema } from 'mongoose';
import * as crypto from 'crypto'
import { User } from '../interfaces/user.interface';

export const UserSchema = new Schema({
    identificationType: {
        type: String,
        enum: ['CC', 'CI'],
        required: true
    },
    identification: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registerStatus: {
        type: String,
        required: true,
        default: 1,
        length: 1
    },
    status: {
        type: String,
        required: true,
        default: 1,
        length: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre<User>('save', function (next) {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
    next();
})