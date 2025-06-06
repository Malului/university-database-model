import { Router } from "express";
import { addDepartment, addSchool } from "../controller/admin.controller.js";

const adminRouter = Router();

adminRouter.post('/addSchool', addSchool);
adminRouter.post('/addDepartment', addDepartment)

export default adminRouter