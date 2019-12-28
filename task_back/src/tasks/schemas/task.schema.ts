import { Schema } from 'mongoose';
const mongoose = require("mongoose");

export const TaskcShema = new Schema({

    name: {
        type: String,
        required: true
    },
    priority: {
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
    status: {
        type: String,
        default: 0
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema"
    }

})