import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Radnik= new Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    speciality:{
        type:String
    },
    emailAgency:{
        type:String
    },
    radi:{
        type:Number
    }
})

export default mongoose.model('RadnikModel', Radnik, 'radnici');