import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    photo: {type: String, required: false},
    phone: {type: String, required: true},
    email: {type: String, required: false},
    description: {type: String, required: false},
    dateOfBirth: {type: String, required: false},
    gender: {type: String, required: false},
    password: String
});

const User = mongoose.model('User', userSchema);

export default User;