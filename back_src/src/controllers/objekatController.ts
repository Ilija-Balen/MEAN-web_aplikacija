import express from 'express'
import ObjekatModel from '../models/objekat'
import RadnikModel from '../models/radnik'
import UserModel from '../models/users'

export class ObjekatController {
    

    getObjekatidO= (req:express.Request, res:express.Response)=>{
        let idO = req.body.idO;
        let email = req.body.email;

        ObjekatModel.findOne({'idO':idO, 'email':email}, (err,obj)=>{
            if(err)console.log(err)
            else res.json(obj)
        })
    }

    addRadnik = (req:express.Request, res:express.Response)=>{
        let email =  req.body.email;
        let idP = req.body.idP;
        let objekat = req.body.objekat;

        ObjekatModel.updateOne({'idO': objekat.idO, 'email': objekat.email, tacke:{$elemMatch:{'idP':idP}}}, {$set:{'tacke.$.emailR':email}}, (err,resp)=>{
            
        })

        RadnikModel.updateOne({'email':email}, {$set:{'radi':1}},(err,resp)=>{
            if(err)console.log(err)
            else res.json({"message":"updated"});
        })
    }

    getAllRadnici = (req:express.Request, res:express.Response)=>{
        let emailAgency = req.query.param;

        RadnikModel.find({'emailAgency':emailAgency, 'radi':0}, (err,svi)=>{
            if(err)console.log(err)
            else res.json(svi);
        })
    }

    promeni_status = (req:express.Request, res:express.Response)=>{
        let idO = req.body.idO;
        let email = req.body.email;
        let idP = req.body.idP;
        let status1 = req.body.status;

        ObjekatModel.updateOne({'idO':idO, 'email':email, tacke:{$elemMatch:{'idP':idP}}}, {$set:{'tacke.$.status':status1}},(err,resp)=>{
            if(err)console.log(err)
            else res.json({"message":"ok"});
        })
    }

    dodajputemJSON = (req:express.Request, res:express.Response)=>{
        let JSONobj = req.body.JSONobj;
        /*ObjekatModel.create({'JSON':JSONobj}, (err,resp)=>{
            if(err)console.log(err)
            else res.json({"message":"OK"});
        });*/
        //let JSONobj = req.body.JSONobj;

        let pom = JSON.parse(JSONobj);
        
        
        let s = new ObjekatModel({
            email:pom["email"],
            roomcnt: pom["roomcnt"],
            surface: pom["surface"],
            State: pom["State"],
            City: pom["City"],
            Street: pom["Street"],
            snumber: pom["snumber"],
            tip: pom["tip"],
            idO: pom["idO"],
            tacke: pom["tacke"],
             vrata:pom["vrata"]
        });
        s.save((err,resp)=>{
            if(err)console.log(err)
            else res.json({"message":"ok"});
        });
        UserModel.updateOne({'email':pom["email"]}, {$set:{'brojobjekata':pom["idO"]}},(err,resp)=>{
            if(err)console.log(err);
        })
    }
}