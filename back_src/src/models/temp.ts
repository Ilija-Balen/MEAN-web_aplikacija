import { Timestamp } from "mongodb";
import mongoose from "mongoose";

let Schema= mongoose.Schema;

let Temp = new Schema({
    email: {
        type:String
    },
    temppass :{
        type: String
    },
    time : {
        type: Date   
    }
})

export default mongoose.model('TempModel', Temp, 'temp');