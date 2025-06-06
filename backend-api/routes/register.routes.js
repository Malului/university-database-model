import {Router} from 'express';
import {  adminRegister, lecturerRegister, studentRegister } from '../controller/register.controller.js';

import { authorize, requireREGISTRAR, requireVC, requireSUPERADMIN } from '../middleware/auth.middleware.js';

const registerRouter = Router()

registerRouter.use(authorize)

//Registrar role - register students
registerRouter.post('/student', requireREGISTRAR, studentRegister)


//VC roles to register lecturers
registerRouter.post('/lecturer', requireVC, lecturerRegister)


//Superadmin role - register admins
registerRouter.post('/admin', requireSUPERADMIN, adminRegister)



export default registerRouter;