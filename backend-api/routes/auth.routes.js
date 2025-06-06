import {Router} from 'express';
import {  adminRegister, lecturerRegister, studentRegister } from '../controller/auth.controller.js';

const authRouter = Router()

authRouter.post('/register/student', studentRegister)
authRouter.post('/register/admin', adminRegister)
authRouter.post('/register/lecturer', lecturerRegister)


export default authRouter;