import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String
    },
    password:{
        type:String
    },
    type:{
        type:Number
    },
    phone:{
        type:String
    },
    email: {
        type:String
    },
    firstname:{
        type:String
    },
    lastname: {
        type:String
    },
    url:{
        type:String
    },
    approved:{
        type: Number
    },
    brojobjekata:{
        type:Number
    }
})

export default mongoose.model('UserModel',User, 'users');