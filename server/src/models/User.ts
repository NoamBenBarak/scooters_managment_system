import { Schema, model, } from 'mongoose';

export interface IUser{
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
}

const userSchema = new Schema({
    userName: { type: String, required: false},
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});


export default model<IUser>('User', userSchema);
