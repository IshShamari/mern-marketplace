import { Schema, model, Document } from 'mongoose';
import { IUserDocument } from './interfaces';


const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profileDetails: {
        address: { type: String },
        phone: { type: String }
    },
}, {timestamps: true})

const User = model<IUserDocument>('User', userSchema);

export default User;