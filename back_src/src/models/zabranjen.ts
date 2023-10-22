import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Zabranjen = new Schema({
    username:{
        type:String
    },
    email:{
        type:String
    }
})

export default mongoose.model('ZabranjenModel',Zabranjen, 'zabranjen');