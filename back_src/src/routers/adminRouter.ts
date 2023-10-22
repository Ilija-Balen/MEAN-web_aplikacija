import express from 'express';
import { adminController } from '../controllers/adminController';

const adminRouter = express.Router();

adminRouter.route('/login').post(
    (req,res) => new adminController().login(req,res)
)

adminRouter.route('/findnotApprovedUsers').get(
    (req,res)=> new adminController().findnotApprovedUsers(req,res)
)

adminRouter.route('/findnotApprovedAgency').get(
    (req,res)=> new adminController().findnotApprovedAgency(req,res)
)

adminRouter.route('/deny').post(
    (req,res)=> new adminController().deny(req,res)
)

adminRouter.route('/accept').post(
    (req,res)=> new adminController().accept(req,res)
)

adminRouter.route('/findAllApprovedUsers').get(
    (req,res)=> new adminController().findAllApprovedUsers(req,res)
)

adminRouter.route('/findAllApprovedAgency').get(
    (req,res)=> new adminController().findAllApprovedAgency(req,res)
)

adminRouter.route('/addUser').post(
    (req,res)=> new adminController().addUser(req,res)
)

adminRouter.route('/addAgency').post(
    (req,res)=> new adminController().addAgency(req,res)
)

adminRouter.route('/obrisi').post(
    (req,res)=> new adminController().obrisi(req,res)
)

adminRouter.route('/azurirajUser').post(
    (req,res)=> new adminController().azurirajUser(req,res)
)

adminRouter.route('/azurirajAgency').post(
    (req,res)=> new adminController().azurirajAgency(req,res)
)

adminRouter.route('/dodajRadnika').post(
    (req,res)=> new adminController().dodajRadnika(req,res)
)

adminRouter.route('/obrisiRadnika').post(
    (req,res)=> new adminController().obrisiRadnika(req,res)
)

adminRouter.route('/azurirajRadnika').post(
    (req,res)=> new adminController().azurirajRadnika(req,res)
)

adminRouter.route('/getAllRadnici').get(
    (req,res)=> new adminController().getAllRadnici(req,res)
)

adminRouter.route('/getAllPoslovi').get(
    (req,res)=> new adminController().getAllPoslovi(req,res)
)

//PAZI GET
//getAllPoslovi
export default adminRouter;