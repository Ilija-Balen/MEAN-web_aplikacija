import express from 'express';
import UserModel from '../models/users'
import TempModel from '../models/temp'
import { log } from 'console';
import AgencyModel from '../models/agency'
import ObjekatModel from '../models/objekat'
import PosaoModel from '../models/posao'
import ZabranjenModel from '../models/zabranjen'

export class userController {

    login= (req:express.Request, res:express.Response)=>{
        let username = req.body.username;
        let pass = req.body.password;

        UserModel.findOne({'username':username, 'password':pass}, (err, user)=>{
            if(err) console.log(err)
            else res.json(user);
        })
    }

    mail= (req:express.Request, res:express.Response)=>{
          

    let messagePassword = req.body.temppass;
    let email = req.body.LoggedUser;

    let nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "91c706f1b4bb80",
          pass: "1c5b59d84c3fc6"
        }
    });
    
    let mailOptions = {
      from: 'youremail@gmail.com',
      to: email,
      subject: 'Sending Email using Node.js',
      text: messagePassword
    };
    
    transporter.sendMail(mailOptions, (err, resp)=>{
        if(err)console.log(err)
        else res.json({'message':'Nova sifra je poslata na E-mail adresu i vazi 10 min!'});
    })


    //Mejl sa novom sifrom poslat, sad ide dodavanje sifre u bazu
        let today = new Date();  
        TempModel.insertMany({
            "email":email,
            "temppass":messagePassword,
            "time": today
        })
    }


    changepass = (req:express.Request, res:express.Response)=>{
        let newpass = req.body.newpass;
        let email = req.body.LoggedUser;
        
        let dalje = false;

        TempModel.findOne({'email': email},(err,tempuser)=>{
            if(err)console.log(err)
            else if(tempuser){ 
                let sad = new Date();
                let tmpusertime = new Date(tempuser.time);
                let vremeza10vise= new Date(tempuser.time)
                
                vremeza10vise.setMinutes(vremeza10vise.getMinutes() + 10);
                
                if(sad > tmpusertime && sad< vremeza10vise){
                    UserModel.findOneAndUpdate({"email": email}, {$set : {"password":newpass}}, (err, t)=>{
                        if(err)console.log(err)
                        else res.json({"message": "USPESNO PROMENJENA LOZINKA"})
                    })
                }else res.json({"message":"PROSLO JE VISE OD 10 MIN"})
                
            
            }else {
                res.json({"message":"NISTE DOBRO UNELI STARU SIFRU"});
            }
        })

    }

    changepass1 = (req:express.Request, res:express.Response) =>{
        let email = req.body.email;
        let newpass = req.body.newpass;

        UserModel.updateOne({'email':email}, {$set: {'password':newpass}}, (err,resp)=>{
            if(err)console.log(err)
            else res.json({"message":"Lozinka uspesno promenjena"})
        })

    }


    deletefromtmp = (req:express.Request, res:express.Response) =>{
        let username = req.body.LoggedUser;
        TempModel.deleteOne({'username':username}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message":"uspesno obrisan iz projectDB.temp"});
        })

    }

    registeruser = (req:express.Request, res:express.Response) =>{
        ZabranjenModel.findOne({'email':req.body.email}, (err,mod)=>{
            if(err)console.log(err)
            else if(mod){
                res.json({"message":"Zabranjen email ili username"});
                return;
            }
        })
        ZabranjenModel.findOne({'username':req.body.username}, (err,mod)=>{
            if(err)console.log(err)
            else if(mod){
                res.json({"message":"Zabranjen email ili username"});
                return;
            }
        })
        
        
        let tip = 0;
        let a= 0;
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

    registeragency= (req:express.Request, res:express.Response) =>{
        
        ZabranjenModel.findOne({'email':req.body.email}, (err,mod)=>{
            if(err)console.log(err)
            else if(mod){
                res.json({"message":"Zabranjen email ili username"});
                return;
            }
        })
        
        ZabranjenModel.findOne({'username':req.body.username}, (err,mod)=>{
            if(err)console.log(err)
            else if(mod){
                res.json({"message":"Zabranjen email ili username"});
                return;
            }
        })
        
        let tip= 1;
        let a = 0;
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

    getobjects= (req:express.Request, res:express.Response)=>{
        let email = req.query.param;
        

        ObjekatModel.find({'email':email}, (err,svi)=>{
            if(err)console.log(err)
            else {res.json(svi);};
        })
    }

    addobject = (req:express.Request, res:express.Response)=>{
        
        let adress = req.body.adresa;
        let adress2 = adress.split(" ");
        let snum = parseInt(adress2[3]);
        let tackeniz;
        let vrataniz;
        switch (req.body.roomcnt) {
            case 1:{
                tackeniz = [{
                    x: 10,
                    y: 10,
                    width: 250,
                    height: 150,
                    status: 0,
                    idP:0
                }];
                vrataniz= [{
                    x: 170,
                    y: 135
                }]
            }
                
                break;
            case 2:{
                tackeniz = [{
                    x: 10,
                    y: 10,
                    width: 200,
                    height: 80,
                    status: 0,
                    idP:0
                },{
                    x: 90,
                    y: 90,
                    width: 120,
                    height: 80,
                    status: 0,
                    idP:1
                }];
                vrataniz = [{
                    x: 150,
                    y: 65
                },{
                    x: 150,
                    y: 145
                }]
            }
                
                break;
            case 3:{
                tackeniz = [{
                    x: 10,
                    y: 10,
                    width: 150,
                    height: 80,
                    status: 0,
                    idP:0
                },{
                    x: 160,
                    y: 10,
                    width: 90,
                    height: 80,
                    status: 0,
                    idP:1
                },{
                    x: 50,
                    y: 90,
                    width: 200,
                    height: 80,
                    status: 0,
                    idP:2
                }];
                vrataniz = [{
                    x: 70,
                    y: 65
                },{
                    x: 170,
                    y: 65
                },{
                    x: 150,
                    y: 145
                }]
            }
                
                break;
            
            default:
                break;
        }
        
        let objekat = new ObjekatModel({
            email: req.body.email,
            roomcnt: req.body.roomcnt,
            surface: req.body.surface,
            State: adress2[0],
            City: adress2[1],
            Street: adress2[2],
            snumber: snum,
            url: req.body.url,
            tip: req.body.tip,
            idO: req.body.idO,
            tacke:tackeniz,
            vrata:vrataniz
        })

        objekat.save((err,resp)=>{
            
        })

        UserModel.updateOne({'email':req.body.email}, {$set: {'brojobjekata':req.body.idO}},(err,resp)=>{
            if(err)console.log(err)
            else res.json({"message":"Dodat objekat"});
        })
    }

    izmeni=(req:express.Request, res:express.Response)=>{
        let email=req.body.email;
        let idO=req.body.idO;
        let tip = req.body.tip;
        let adresa= req.body.adresa;
        let roomcnt= req.body.roomcnt;
        let surface = req.body.surface;
        let url = req.body.url;

        if(tip){
            ObjekatModel.updateOne({'idO':idO, 'email':email}, {$set:{'tip':tip}}, (err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"update tip success"})
            })
        }else
        if(adresa){
            let adresa2 = adresa.split(" ");
            //console.log(adresa2);
            let snumber = parseInt(adresa2[3]);
            ObjekatModel.updateOne({'idO':idO, 'email':email}, {$set:{'State':adresa2[0], 'City': adresa2[1], 'Street': adresa2[2], 'snumber':snumber}}, (err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"update adresa success"})
            })
        }else
        if(roomcnt){
            let tackeniz=[];
            let vrataniz=[];
            console.log(roomcnt);
            if(roomcnt==1){
                console.log("USAO U TACKU 1");
                    tackeniz = [{
                        x: 10,
                        y: 10,
                        width: 250,
                        height: 150,
                        status: 0,
                        idP:0
                    }];
                    vrataniz= [{
                        x: 170,
                        y: 135
                    }]
            }else if(roomcnt==2){
                tackeniz = [{
                    x: 10,
                    y: 10,
                    width: 200,
                    height: 80,
                    status: 0,
                    idP:0
                },{
                    x: 90,
                    y: 90,
                    width: 120,
                    height: 80,
                    status: 0,
                    idP:1
                }];
                vrataniz = [{
                    x: 150,
                    y: 65
                },{
                    x: 150,
                    y: 145
                }]
            }else if(roomcnt==3){
                //console.log("USAO U TACKU 3");
                    tackeniz = [{
                        x: 10,
                        y: 10,
                        width: 150,
                        height: 80,
                        status: 0,
                        idP:0
                    },{
                        x: 160,
                        y: 10,
                        width: 90,
                        height: 80,
                        status: 0,
                        idP:1
                    },{
                        x: 50,
                        y: 90,
                        width: 200,
                        height: 80,
                        status: 0,
                        idP:2
                    }];
                    vrataniz = [{
                        x: 70,
                        y: 65
                    },{
                        x: 170,
                        y: 65
                    },{
                        x: 150,
                        y: 145
                    }]
            }
            //console.log(tackeniz);
            //console.log(vrataniz);
            
            ObjekatModel.updateOne({'idO':idO, 'email':email}, {$set:{'roomcnt':roomcnt, 'tacke':tackeniz, 'vrata':vrataniz,'url':url}}, (err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"update roomcnt success"})
            })
        }else
        if(surface){
            ObjekatModel.updateOne({'idO':idO, 'email':email}, {$set:{'surface':surface}}, (err,resp)=>{
                if(err)console.log(err)
                else res.json({"message":"update surface success"})
            })
        }
    }

    deleteobj = (req:express.Request, res:express.Response)=>{
        let idO = req.body.idO;
        let loggedUser= req.body.loggedUser;

        ObjekatModel.deleteOne({'idO':idO, 'email':loggedUser.email}, (err,resp)=>{
            if(err)console.log(err)
            else{
            }
        })

        UserModel.updateOne({'email':loggedUser.email}, {$set: {'brojobjekata':loggedUser.brojobjekata-1}}, (err,resp)=>{
            if(err)console.log(err)
            else res.json({"message":"updated"})
        })
           
        

    }

    getUser = (req:express.Request, res:express.Response)=>{
        let email = req.query.param;

        UserModel.findOne({'email':email}, (err, user)=>{
            if(err)console.log(err)
            else res.json(user);
        }
        )
    }
}
