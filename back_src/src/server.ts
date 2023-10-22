import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/usersRouter';
import adminRouter from './routers/adminRouter'
import agencyRouter from './routers/agencyRouter';
import posaoRouter from './routers/posaoRouter';
import objekatRouter from './routers/objekatRouter';


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/projectDB');
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/users', userRouter);
router.use('/admin', adminRouter);
router.use('/agency', agencyRouter);
router.use('/posao', posaoRouter);
router.use('/objekat',objekatRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));