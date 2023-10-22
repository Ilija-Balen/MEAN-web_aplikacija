import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Posao = new Schema({
    idO:{
        type:Number
    },
    status:{
        type:Number
    },
    
    email:{
        type:String
    },
    emailAgency:{
        type:String
    },
    ponudaAgencije:{
        type:Number
    },
    vreme:{
        type:String
    },
    prihvacen:{
        type:Number
    }
})

export default mongoose.model('PosaoModel', Posao, 'poslovi');