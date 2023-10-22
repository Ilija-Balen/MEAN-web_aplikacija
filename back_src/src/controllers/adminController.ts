import express from 'express';
import AdminModel from '../models/admin'
import UserModel from '../models/users'
import AgencyModel from '../models/agency'
import ObjekatModel from '../models/objekat'
import PosaoModel from '../models/posao'
import ZabranjenModel from '../models/zabranjen';
import RadnikModel from '../models/radnik';
import radnik from '../models/radnik';

export class adminController {

    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let pass = req.body.password;

        AdminModel.findOne({'username':username, 'password':pass, 'type': 2}, (err, Admin)=>{
            if(err) console.log(err)
            else res.json(Admin);
            
        })
    }

    findnotApprovedUsers= (req:express.Request, res: express.Response)=>{
        UserModel.find({'approved':0, 'type':0}, (err, svi)=>{
            if(err) console.log(err)
            else res.json(svi)
        })
    }

    findnotApprovedAgency = (req:express.Request, res: express.Response)=>{
        let tip=1;
        AgencyModel.find({'approved':0, 'type':tip}, (err,svi)=>{
            if(err)console.log(err)
            else res.json(svi)
           
        })
    }

    accept= (req:express.Request, res: express.Response)=>{
        let email1= req.body.email;
        let tip=1;
        UserModel.updateOne({'email' : email1}, {$set : {'approved' : tip}}, (err,resp)=>{
            if(err)console.log(err)
            else res.json({"message":"Uspesno prihvacen zahtev"})
        })
    }

    deny = (req:express.Request, res: express.Response)=>{
        let email1= req.body.email;

        UserModel.findOne({'email':email1},(err,kor)=>{
            if(err)console.log(err)
            else {
                let z = new ZabranjenModel({
                    'username':kor.username,
                    'email':email1
                })
                z.save((err,resp)=>{
                    
                })
            }
        })

        UserModel.deleteOne({'email' : email1}, (err,resp)=>{
            if(err) console.log(err)
            else res.json({"message":"Uspesno obrisan zahtev"})
        })
    }

    findAllApprovedUsers= (req:express.Request, res: express.Response)=>{
        UserModel.find({'approved':1, 'type':0}, (err,svi)=>{
            if(err)console.log(err)
            else res.json(svi);
        })
    }

    findAllApprovedAgency= (req:express.Request, res: express.Response)=>{
        UserModel.find({'approved':1, 'type':1}, (err,svi)=>{
            if(err)console.log(err)
            else res.json(svi);
        })
    }

    addUser= (req:express.Request, res: express.Response)=>{
        let tip = 0;
        let a= 1;
        let korisnik = new UserModel ({
            username: req.body.username,
            password: req.body.password,
            phone: req.body.phone,
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            url: req.body.url,
            type: tip,
            approved:a
        })

        korisnik.save((err,resp)=>{
            if(err)console.log(err)
            else res.json({"message": "Korisnik je uspesno dodat"})
        })
    }

    addAgency= (req:express.Request, res: express.Response)=>{
        let tip= 1;
        let a = 1;
        let korisnik = new AgencyModel ({
            username: req.body.username,
            password: req.body.password,
            phone: req.body.phone,
            email: req.body.email,
            agname: req.body.agname,
            State: req.body.state,
            City: req.body.city,
            Street: req.body.street,
            snumber: req.body.snumber,
            PIB: req.body.PIB,
            description: req.body.description,
            url: req.body.url,
            type: tip,
            approved:a
        })

        korisnik.save((err,resp)=>{
            if(err)console.log(err)
            else res.json({"message": "Agencija je uspesno dodata"})
        })
    }

    obrisi= (req:express.Request, res: express.Response)=>{
        UserModel.deleteOne({'email':req.body.email}, (err,resp)=>{
            if(err)console.log(err)
            else res.json({"message":"Uspesno obrisan"})
        })
    }

    dodajRadnika= (req:express.Request, res: express.Response)=>{
        let radnik = new RadnikModel({
            email:req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            speciality: req.body.speciality,
            emailAgency:req.body.emailAgency,
            radi: 0
        })
        radnik.save((err,resp)=>{
            if(err)console.log(err)
            else res.json({"message":"ok"});
        })
    }

    obrisiRadnika= (req:express.Request, res: express.Response)=>{
        ObjekatModel.updateOne({'tacke':{$elemMatch:{'emailR':req.body.email}}}, {$set:{'tacke.$.emailR':null, 'tacke.$.status':0}},(err,resp)=>{
            if(err)console.log(err)
            else{
                RadnikModel.deleteOne({'email':req.body.email},(err,resp)=>{
                    if(err)console.log(err)
                    else res.json({"message":"ok"});
                });
            }
        });
    }

    getAllRadnici= (req:express.Request, res: express.Response)=>{
        RadnikModel.find({}, (err,svi)=>{
            if(err)console.log(err)
            else res.json(svi);
        })
    }

    getAllPoslovi= (req:express.Request, res: express.Response)=>{
        PosaoModel.find({}, (err,svi)=>{
            if(err)console.log(err)
            else res.json(svi);
        })
    }

    azurirajUser= (req:express.Request, res: express.Response)=>{
        if(req.body.username){
            UserModel.updateOne({'email':req.body.emailSession},{$set:{'username':req.body.username}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated user set username"})
            })
        }else if(req.body.password){
            UserModel.updateOne({'email':req.body.emailSession},{$set:{'password':req.body.password}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated user set password"})
            })
        }else if(req.body.phone){
            UserModel.updateOne({'email':req.body.emailSession},{$set:{'phone':req.body.phone}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated user set phone"})
            })
        }else if(req.body.email){
            UserModel.updateOne({'email':req.body.emailSession},{$set:{'email':req.body.email}},(err,resp)=>{
                if(err)console.log(err)
                else {
                    ObjekatModel.updateMany({'email':req.body.emailSession}, {$set: {'email':req.body.email}},(err,resp)=>{
                        if(err)console.log(err)
                        else {
                            PosaoModel.updateMany({'email':req.body.emailSession}, {$set: {'email':req.body.email}},(err,resp)=>{
                                if(err)console.log(err)
                                else res.json({"message":"Updated user set email and all his OBJECTS and JOBS"})
                            })
                        }
                    })
                }
            })
        }else if(req.body.firstname){
            UserModel.updateOne({'email':req.body.emailSession},{$set:{'firstname':req.body.firstname}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated user set firstname"})
            })
        }else if(req.body.lastname){
            UserModel.updateOne({'email':req.body.emailSession},{$set:{'lastname':req.body.lastname}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated user set lastname"})
            })
        }else if(req.body.url){
            UserModel.updateOne({'email':req.body.emailSession},{$set:{'url':req.body.url}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated user set Picture"})
            })
        }
    }

    
    azurirajAgency= (req:express.Request, res: express.Response)=>{
        if(req.body.username){
            UserModel.updateOne({'email':req.body.emailSession},{$set:{'username':req.body.username}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated user set username"})
            })
        }else if(req.body.password){
            UserModel.updateOne({'email':req.body.emailSession},{$set:{'password':req.body.password}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated user set password"})
            })
        }else if(req.body.phone){
            UserModel.updateOne({'email':req.body.emailSession},{$set:{'phone':req.body.phone}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated user set phone"})
            })
        }else if(req.body.email){
            UserModel.updateOne({'email':req.body.emailSession},{$set:{'email':req.body.email}},(err,resp)=>{
                if(err)console.log(err)
                else {
                    PosaoModel.updateMany({'emailAgency':req.body.emailSession}, {$set: {'emailAgency':req.body.email}},(err,resp)=>{
                        if(err)console.log(err)
                        else {
                            RadnikModel.updateMany({'emailAgency':req.body.emailSession}, {$set: {'emailAgency':req.body.email}},(err,resp)=>{
                                if(err)console.log(err)
                                else res.json({"message":"Updated Agency set UserEmail, Radnik, Posao"})
                            })
                        }
                    })
                }
            })
        }else if(req.body.agname){
            AgencyModel.updateOne({'email':req.body.emailSession},{$set:{'agname':req.body.agname}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated user set agname"})
            })
        }else if(req.body.state){
            AgencyModel.updateOne({'email':req.body.emailSession},{$set:{'State':req.body.state}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated user set state"})
            })
        }else if(req.body.city){
            AgencyModel.updateOne({'email':req.body.emailSession},{$set:{'City':req.body.city}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated user set city"})
            })
        }else if(req.body.street){
            AgencyModel.updateOne({'email':req.body.emailSession},{$set:{'Street':req.body.street}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated user set street"})
            })
        }else if(req.body.snumber){
            AgencyModel.updateOne({'email':req.body.emailSession},{$set:{'snumber':req.body.snumber}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated user set snumber"})
            })
        }else if(req.body.PIB){
            AgencyModel.updateOne({'email':req.body.emailSession},{$set:{'PIB':req.body.PIB}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated user set PIB"})
            })
        }else if(req.body.description){
            
            AgencyModel.updateOne({'email':req.body.emailSession},{$set:{'description':req.body.description}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated Agencija set description"})
            })
        }else if(req.body.url){
            UserModel.updateOne({'email':req.body.emailSession},{$set:{'url':req.body.url}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated user set Picture"})
            })
        }
    }

    azurirajRadnika= (req:express.Request, res: express.Response)=>{
        if(req.body.phone){
            RadnikModel.updateOne({'email':req.body.emailSession},{$set:{'phone':req.body.phone}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated radnik set phone"})
            })
        }else if(req.body.email){
            ObjekatModel.updateOne({'tacke':{$elemMatch:{'emailR':req.body.emailSession}}}, {$set:{'tacke.$.emailR':req.body.email}}, (err,resp)=>{
                if(err)console.log(err)
                else {
                    RadnikModel.updateOne({'email':req.body.emailSession}, {$set:{'email':req.body.email}},(err,resp)=>{
                        if(err)console.log(err)
                        else res.json({"message":"updated email Objekta i email radnika"})
                    })
                }
            })
        }else if(req.body.firstname){
            RadnikModel.updateOne({'email':req.body.emailSession},{$set:{'firstname':req.body.firstname}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated radnik set firstname"})
            })
        }else if(req.body.lastname){
            RadnikModel.updateOne({'email':req.body.emailSession},{$set:{'username':req.body.lastname}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated radnik set lastname"})
            })
        }else if(req.body.speciality){
            RadnikModel.updateOne({'email':req.body.emailSession},{$set:{'speciality':req.body.speciality}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated radnik set speciality"})
            })
        }else if(req.body.emailAgency){
            RadnikModel.updateOne({'email':req.body.emailSession},{$set:{'emailAgency':req.body.emailAgency}},(err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"Updated radnik set different agency"})
            })
        }

        
    }
}
    
