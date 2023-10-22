import mongoose from "mongoose";

const Schema = mongoose.Schema;

let AgencyandRecensions = new Schema({
    email:{
        type:String
    },
    komentari:{
        type:[{komentar:String, ocena:Number, firstname: String, lastname: String, email: String}]
    }
})

export default mongoose.model('AgencyAndRecensionsModel', AgencyandRecensions, 'recensions');