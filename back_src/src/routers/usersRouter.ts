import express from 'express';
import { userController } from '../controllers/usersController';

const userRouter = express.Router()

userRouter.route('/login').post(
    (req,res)=> new userController().login(req,res)
)

userRouter.route('/sendmail').post(
    (req,res)=> new userController().mail(req,res)
)

userRouter.route('/changepass').post(
    (req,res)=> new userController().changepass(req,res)
)

userRouter.route('/deletefromtmp').post(
    (req,res) => new userController().deletefromtmp(req,res)
)

userRouter.route('/registeruser').post(
    (req,res) => new userController().registeruser(req,res)
)

userRouter.route('/registeragency').post(
    (req,res)=> new userController().registeragency(req,res)
)

userRouter.route('/changepass1').post(
    (req,res)=> new userController().changepass1(req,res)
)

userRouter.route('/getobjects').get(
    (req,res)=> new userController().getobjects(req,res)
)

userRouter.route('/addobject').post(
    (req,res)=> new userController().addobject(req,res)
)

userRouter.route('/izmeni').post(
    (req,res)=> new userController().izmeni(req,res)
)

userRouter.route('/deleteobj').post(
    (req,res)=> new userController().deleteobj(req,res)
)

userRouter.route('/getUser').get(
    (req,res)=> new userController().getUser(req,res)
)
//getUser
export default userRouter;