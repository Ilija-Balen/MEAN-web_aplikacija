import express from 'express'
import PosaoModel from '../models/posao'
import RadnikModel from '../models/radnik'
import ObjekatModel from '../models/objekat'

export class PosaoController {
    


    getAllForUser= (req:express.Request, res:express.Response)=>{
        let email = req.query.param;

        PosaoModel.find({'email':email}, (err,svi)=>{
            if(err)console.log(err)
            else res.json(svi)
        })
    }

    getAllForAgency = (req:express.Request, res:express.Response)=>{
        let emailAgency = req.query.param;

        PosaoModel.find({'emailAgency':emailAgency, 'prihvacen':0}, (err,svi)=>{
            if(err)console.log(err)
            else res.json(svi);
        })
    }

    trazi_saradnju= (req:express.Request, res:express.Response)=>{
        let email = req.body.email;
        let emailAgency = req.body.emailAgency;
        let vreme = req.body.vreme;
        let s = 0;
        let idO = req.body.idO;

        let posao = new PosaoModel({
            idO:idO,
            status: s,
            email:email,
            emailAgency:emailAgency,
            vreme:vreme,
            prihvacen: 0
        })

        posao.save((err,resp)=>{
            if(err)console.log(err)
            else res.json({"message":"ok"})
        })
    }

    zavrsiposao= (req:express.Request, res:express.Response)=>{
        let idO= req.body.idO;
        let email = req.body.email;

        PosaoModel.updateOne({'idO':idO, 'email':email}, {$set:{'status':2}},(err,resp)=>{
            if(err)console.log(err)
            else res.json({'message':'ok'});
        })

        ObjekatModel.findOne({'idO':idO, 'email':email},(err,obj)=>{
            if(err)console.log(err)
            else{
                for (const tacka of obj.tacke) {
                    // for (const radnik of tacka.emailR) {
                    //     RadnikModel.updateOne({'email': radnik},{$set:{'radi':0}},(err,resp)=>{

                    //     })
                    // }
                    RadnikModel.updateOne({'email': tacka.emailR}, {$set:{'radi':0}},(err,resp)=>{
                        
                    })
                }
            }
        })
    }

    prihvati = (req:express.Request, res:express.Response)=>{
        let idO = req.body.idO;
        let email = req.body.email;

        PosaoModel.updateOne({'idO':idO, 'email':email}, {$set:{'status':1}},(err,resp)=>{
            if(err)console.log(err)
            else res.json({'message':'ok'})
        })
    }

    odbij = (req:express.Request, res:express.Response)=>{
        let idO= req.body.idO;
        let email = req.body.email;
        
        PosaoModel.updateOne({'idO':idO, 'email':email}, {$set:{'prihvacen':-1}}, (err,resp)=>{
            if(err)console.log(err)
            else res.json({"message":"ok"});
        })
    }

    setPonuda= (req:express.Request, res:express.Response)=>{
        let idO = req.body.idO;
        let email = req.body.email;
        let ponuda = req.body.ponuda;

        PosaoModel.updateOne({'email':email, 'idO':idO}, {$set: {'ponudaAgencije':ponuda, 'prihvacen':1}}, (err,resp)=>{
            if(err)console.log(err)
            else res.json({"message":"ok"});
        })
    }

    getAllForAgencyActive = (req:express.Request, res:express.Response)=>{
        let email = req.query.param;

        PosaoModel.find({'emailAgency':email, 'status':1},(err,svi)=>{
            if(err)console.log(err)
            else res.json(svi);
        })
    }

    obrisiPosao= (req:express.Request, res:express.Response)=>{
        let idO= req.body.idO;
        let email = req.body.email;
        
        PosaoModel.deleteOne({'idO':idO, 'email':email}, (err,resp)=>{
            if(err)console.log(err)
            else res.json({"message":"ok"});
        })
    }
}