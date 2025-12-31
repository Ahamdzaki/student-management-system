import mongoose from "mongoose";
import validator from 'validator';

export const Student = mongoose.model('Student',{
    name: {
        type: String,
        required: true,
        trim: true
    },
    age : {
        type: Number,
        required: true,
        validate(value){
            if (value < 7 ) {
                throw new Error ('You can not join in computer class ')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Email address is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.includes("password")) {
                throw new Error ('the password must not contain "password"')
            }
        }
    }
})
