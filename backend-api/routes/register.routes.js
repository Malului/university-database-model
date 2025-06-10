import {Router} from 'express';
import {  adminRegister, lecturerRegister, studentRegister } from '../controller/register.controller.js';

import { authorize, requireREGISTRAR, requireVC, requireSUPERADMIN } from '../middleware/auth.middleware.js';

import { auditLog } from '../middleware/audit.middleware.js';

const registerRouter = Router()

registerRouter.use(authorize)

//Registrar role - register students
registerRouter.post('/student', requireREGISTRAR, auditLog('CREATE', 'student'), studentRegister)


//VC roles to register lecturers
registerRouter.post('/lecturer', requireVC, auditLog('CREATE', 'lecturer'), lecturerRegister)


//Superadmin role - register admins
registerRouter.post('/admin', requireSUPERADMIN, auditLog('CREATE', 'admin'), adminRegister)



export default registerRouter;