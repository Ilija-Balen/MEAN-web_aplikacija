import express from 'express';
import { ObjekatController } from '../controllers/objekatController';


const objekatRouter = express.Router();


objekatRouter.route('/getObjekatidO').post(
    (req,res) => new ObjekatController().getObjekatidO(req,res)
)

objekatRouter.route('/addRadnik').post(
    (req,res) => new ObjekatController().addRadnik(req,res)
)

objekatRouter.route('/getAllRadnici').get(
    (req,res) => new ObjekatController().getAllRadnici(req,res)
)

objekatRouter.route('/promeni_status').post(
    (req,res) => new ObjekatController().promeni_status(req,res)
)

objekatRouter.route('/dodajputemJSON').post(
    (req,res) => new ObjekatController().dodajputemJSON(req,res)
)



//dodajputemJSON
export default objekatRouter;