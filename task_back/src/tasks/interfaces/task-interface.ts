import { Document } from 'mongoose';
export interface TaskInterface extends Document {
    name: string;
    priority: string;
    readonly createdAt: Date;
    expirationDate: string;
    owner_id: number;
    status?: string;
}
