import express from 'express';
import { PosaoController } from '../controllers/posaoController';

const posaoRouter = express.Router();

posaoRouter.route('/getAllForUser').get(
    (req,res)=> new PosaoController().getAllForUser(req,res)
)

posaoRouter.route('/trazi_saradnju').post(
    (req,res)=> new PosaoController().trazi_saradnju(req,res)
)

posaoRouter.route('/zavrsiposao').post(
    (req,res)=> new PosaoController().zavrsiposao(req,res)
)

posaoRouter.route('/prihvati').post(
    (req,res)=> new PosaoController().prihvati(req,res)
)

posaoRouter.route('/odbij').post(
    (req,res)=> new PosaoController().odbij(req,res)
)

posaoRouter.route('/getAllForAgency').get(
    (req,res)=> new PosaoController().getAllForAgency(req,res)
)

posaoRouter.route('/setPonuda').post(
    (req,res)=> new PosaoController().setPonuda(req,res)
)

posaoRouter.route('/odbij').post(
    (req,res)=> new PosaoController().odbij(req,res)
)

posaoRouter.route('/getAllForAgencyActive').get(
    (req,res)=> new PosaoController().getAllForAgencyActive(req,res)
) 

posaoRouter.route('/obrisiPosao').post(
    (req,res)=> new PosaoController().obrisiPosao(req,res)
)
//obrisiPosao
export default posaoRouter;