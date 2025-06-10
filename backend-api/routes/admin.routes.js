import { Router } from "express";
import { addCourse, addDepartment, addSchool, addUnit, viewStudents } from "../controller/admin.controller.js";

import { auditLog } from "../middleware/audit.middleware.js";

import { authorize, requireDVC, requireFINANCE, requireREGISTRAR, requireSUPERADMIN, requireVC } from "../middleware/auth.middleware.js";

const adminRouter = Router();

adminRouter.use(authorize)

//DVC role
adminRouter.post('/addSchool', requireDVC, auditLog('CREATE', 'school'), addSchool);
adminRouter.post('/addDepartment', requireDVC, auditLog('CREATE', 'department'), addDepartment);

//Registrar roles
adminRouter.post('/addCourse', requireREGISTRAR, auditLog('CREATE', 'course'), addCourse);
adminRouter.post('/addUnit', requireREGISTRAR, auditLog('CREATE', 'unit'), addUnit)
adminRouter.get('/viewAllStudents', auditLog('VIEW', 'allStudents'), viewStudents)

//Finance roles
// adminRouter.get('/students/finance', requireFINANCE, getStudentFinances);
// adminRouter.post('/invoice', requireFINANCE, createInvoice);
// adminRouter.post('/payment', requireFINANCE, recordPayment);

//VC Roles
adminRouter.get('/audit-logs', requireVC, getAuditLogs);


//Superadmin roles
// adminRouter.delete('/admin/:id', requireSUPERADMIN, deleteAdmin);
// adminRouter.put('/admin/update/:id', requireSUPERADMIN, adminUpdate)

export default adminRouter