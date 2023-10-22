import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Objekat = new Schema({
    email:{
        type:String
    },
    roomcnt:{
        type:Number
    },
    surface:{
        type:Number
    },
    State:{
        type:String
    },
    City:{
        type:String
    },
    Street :{
        type:String
    },
    snumber :{
        type:Number
    },
    url:{
        type:String
    },
    tip:{
        type:String
    },
    idO:{
        type:Number
    },
    tacke:{
        type:[{ x:Number,
            y:Number,
            width:Number,
            height:Number,
            status:Number,
            emailR:String,
            idP:Number}]
    },
    vrata:{
        type:Array
    }
})

export default mongoose.model('ObjekatModel', Objekat, 'objekti');