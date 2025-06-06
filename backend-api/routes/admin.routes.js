import { Router } from "express";
import { addCourse, addDepartment, addSchool, addUnit, viewStudents } from "../controller/admin.controller.js";

const adminRouter = Router();

adminRouter.post('/addSchool', addSchool);
adminRouter.post('/addDepartment', addDepartment);
adminRouter.post('/addCourse', addCourse);
adminRouter.post('/addUnit', addUnit)

adminRouter.get('/viewAllStudents', viewStudents)

export default adminRouter