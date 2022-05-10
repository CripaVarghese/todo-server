import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserStructure = {
    username: String,
    password: String,
    email: String,
    isActive: Boolean,
    createdAt: Date,
    name: String,
    isMailVerified: Boolean,
}

const UserSchema = new Schema(UserStructure);

const User =  model('user', UserSchema);

export default User;