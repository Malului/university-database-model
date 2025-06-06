import { Router } from "express";
import { addCourse, addDepartment, addSchool, addUnit, viewStudents } from "../controller/admin.controller.js";

import { authorize, requireDVC, requireFINANCE, requireREGISTRAR, requireSUPERADMIN, requireVC } from "../middleware/auth.middleware.js";

const adminRouter = Router();

adminRouter.use(authorize)

//DVC role
adminRouter.post('/addSchool', requireDVC, addSchool);
adminRouter.post('/addDepartment', requireDVC, addDepartment);

//Registrar roles
adminRouter.post('/addCourse', requireREGISTRAR, addCourse);
adminRouter.post('/addUnit', requireREGISTRAR, addUnit)
adminRouter.get('/viewAllStudents', viewStudents)

//Finance roles
// adminRouter.get('/students/finance', requireFINANCE, getStudentFinances);
// adminRouter.post('/invoice', requireFINANCE, createInvoice);
// adminRouter.post('/payment', requireFINANCE, recordPayment);

// //Superadmin roles
// adminRouter.delete('/admin/:id', requireSUPERADMIN, deleteAdmin);
// adminRouter.put('/admin/update/:id', requireSUPERADMIN, adminUpdate)

export default adminRouter