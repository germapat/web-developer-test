import { Schema } from 'mongoose';
import * as crypto from 'crypto'
import { User } from '../interfaces/user.interface';

export const UserSchema = new Schema({
    identificationType: {
        type: String,
        enum: ['CC', 'TI', 'CE', 'RC'],
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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre<User>('save', function (next) {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
    next();
})