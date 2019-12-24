import { Document } from 'mongoose';

export interface User extends Document {
    readonly identificationType: string;
    readonly identification: string;
    readonly name: string;
    readonly email: string;
    password: string;
    readonly createdAt: Date;
}