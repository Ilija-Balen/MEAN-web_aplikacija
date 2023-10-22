import mongoose from "mongoose";

const Schema= mongoose.Schema;

let Admin = new Schema({
    username: {
        type:String
    },
    password: {
        type:String
    },
    type:{
        type:Number
    },
    phone:{
        type:Number
    },
    email: {
        type:String
    }
})

export default mongoose.model("AdminModel",Admin,"users");