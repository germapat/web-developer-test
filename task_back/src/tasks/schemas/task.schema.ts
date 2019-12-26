import { Schema } from 'mongoose';
import * as crypto from 'crypto'
import { UserSchema } from '../../users/schemas/user.schema';

export const TaskcShema = new Schema({

    name: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expirationDate: {
        type: Date
    },
    relations: {
        owner: {
          type: 'one-to-one',
          target: UserSchema,
          joinColumn: 'owner_id'
        }
      }
})