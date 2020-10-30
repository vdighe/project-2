//
// USER for the RUNTRACKER
//
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true , trim: true, minlength: 5},
    fullName: { type: String, required: 'Please enter your full name!' },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: 'Please enter your gender!'
    },
    //password: String, ==> Add later during authentication process
    age: { type: Number, required: 'Please enter your age!' },
    about: { type: String, required: 'Please write about youself!' },
    created: { type: Date, default: Date.now },
    photo: { type: String },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;