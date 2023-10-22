import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Agency = new Schema({
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
    agname:{
        type:String
    },
    State:{
        type:String
    },
    City: {
        type:String
    },
    Street :{
        type:String
    },
    snumber :{
        type:Number
    },
    PIB: {
        type: Number
    },
    description:{
        type:String
    },
    url:{
        type:String
    },
    approved:{
        type:Number
    }
})

export default mongoose.model('AgencyModel',Agency, 'users');