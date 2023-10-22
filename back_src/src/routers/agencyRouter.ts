import express from 'express';
import { agencyController } from '../controllers/agencyController';

const agencyRouter = express.Router();

agencyRouter.route('/getallAgencies').get(
    (req,res)=> new agencyController().getallAgencies(req,res)
)

agencyRouter.route('/searchByAgname').post(//promeni u get
    (req,res)=> new agencyController().searchByAgname(req,res)
)

agencyRouter.route('/searchByAddress').post(//promeni u get
    (req,res)=> new agencyController().searchByAddress(req,res)
)

agencyRouter.route('/searchByboth').post(//promeni u get
    (req,res)=> new agencyController().searchByboth(req,res)
)

agencyRouter.route('/getallRecensionsDepersonalized').get(//get
    (req,res)=> new agencyController().getallRecensionsDepersonalized(req,res)
)

agencyRouter.route('/jelocenjen').post(
    (req,res)=> new agencyController().jelocenjen(req,res)
)

agencyRouter.route('/izmenikomentar').post(
    (req,res)=> new agencyController().izmenikomentar(req,res)
)

agencyRouter.route('/obrisikomentar').post(
    (req,res)=> new agencyController().obrisikomentar(req,res)
)

agencyRouter.route('/dodajkomentar').post(
    (req,res)=> new agencyController().dodajkomentar(req,res)
)

//dodajkomentar
export default agencyRouter;