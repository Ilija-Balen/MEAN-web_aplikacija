import express from 'express'
import AgencyModel from '../models/agency'
import AgencyAndRecensionsModel from '../models/agencyandrecensions';
import UserModel from '../models/users'


export class agencyController {


    getallAgencies = (req:express.Request, res: express.Response) =>{
        let tip= 1;
        let app= 1;
        AgencyModel.find({'type': tip, 'approved':1}, (err, svi)=>{
            if(err)console.log(err)
            else res.json(svi)
        })
    }

    searchByAgname = (req:express.Request, res: express.Response)=>{
        let agname= req.body.agname;

        AgencyModel.find({'agname':{$regex:agname} , 'approved':1}, (err,svi)=>{
            if(err)console.log(err)
            else res.json(svi);
        })
    }

    searchByAddress= (req:express.Request, res: express.Response)=>{
        let state = req.body.state;
        let city = req.body.city;
        let street = req.body.street;
        let snum = req.body.snum;

        AgencyModel.find({'State': {$regex:state}, 'City':{$regex:city}, 
        'Street': {$regex:street}, 'snumber': snum, 'approved':1}, (err,svi)=>{
            if(err)console.log(err)
            else res.json(svi);
        })
    }

    searchByboth= (req:express.Request, res: express.Response)=>{
        let agname= req.body.agname;
        let state = req.body.state;
        let city = req.body.city;
        let street = req.body.street;
        let snum = req.body.snum;

        AgencyModel.find({'agname':{$regex:agname}, 'State': {$regex:state}, 'City':{$regex:city}, 
        'Street': {$regex:street}, 'snumber': snum, 'approved':1}, (err,svi)=>{
            if(err)console.log(err)
            else res.json(svi);
        })
    }

    getallRecensionsDepersonalized = (req:express.Request, res: express.Response)=>{
        let email = req.query.param; 
        
        AgencyAndRecensionsModel.findOne({'email':email}, (err,svi)=>{
            if(err)console.log(err)
            else res.json(svi);
        })
    }

    jelocenjen= (req:express.Request, res: express.Response)=>{
        let email = req.body.email;
        let emailAgency = req.body.emailAgency;

        AgencyAndRecensionsModel.findOne({'email':emailAgency}, (err,agencija)=>{
            if(err)console.log(err)
            else if (agencija){
                
                for (const iterator of agencija.komentari) {
                    if(iterator.email==email){
                        res.json({"opcija":2});//ima komentar
                        return;
                    }
                }
                res.json({"opcija":1});//nema komentar
                return; 
            }else{
                //nema komentara za agenciju
                res.json({"opcija":1})//nema komentar
            }
        })
    }

    izmenikomentar = (req:express.Request, res: express.Response)=>{
        let email = req.body.email;
        let emailAgency = req.body.emailAgency;
        let komentar = req.body.komentar;
        let ocena = req.body.ocena;

        AgencyAndRecensionsModel.updateOne({'email':emailAgency, komentari:{$elemMatch: {'email':email}}}, {$set:{"komentari.$.komentar": komentar, "komentari.$.ocena":ocena}}, (err,resp)=>{
            if(err)console.log(err)
            else res.json({"message":"ok"});
        })

    }

    obrisikomentar= (req:express.Request, res: express.Response)=>{
        let email = req.body.email;
        let emailAgency = req.body.emailAgency;

        AgencyAndRecensionsModel.updateOne({'email':emailAgency}, {$pull: {"komentari":{"email":email}}}, (err,resp)=>{
            if(err)console.log(err)
            else res.json({"message":"Obrisan"})
        })
    }

    dodajkomentar = (req:express.Request, res: express.Response)=>{
        let email= req.body.email;
        let emailAgency = req.body.emailAgency;
        
        UserModel.findOne({'email':email}, (err, user)=>{
            if(err)console.log(err)
            else if (user){
                let comment = {
                    komentar:req.body.komentar,
                    ocena:req.body.ocena,
                    firstname:user.firstname,
                    lastname:user.lastname,
                    email: email
                }
                AgencyAndRecensionsModel.findOne({'email':emailAgency},(err,ag)=>{
                    if(err)console.log(err)
                    else if (ag){
                        AgencyAndRecensionsModel.updateOne({'email':emailAgency}, {$push:{"komentari":comment}},(err,resp)=>{
                            if(err)console.log(err)
                            else res.json({"message":"Dodat komentar"})
                        })
                    }else{
                        let agandrecension = new AgencyAndRecensionsModel ({
                            email:emailAgency
                        })
                        agandrecension.save((err,resp)=>{
                            if(err)console.log(err)
                            else {
                                AgencyAndRecensionsModel.updateOne({'email':emailAgency}, {$push:{"komentari":comment}},(err,resp)=>{
                                    if(err)console.log(err)
                                    else res.json({"message":"Dodat komentar"})
                                })
                            }
                        })
                    }
                })
                
            }
        })
    }
}