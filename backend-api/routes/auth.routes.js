import { Router } from "express";
import { adminLogin, studentLogin, lecturerLogin } from "../controller/auth.controller.js";

const authRouter = Router();


authRouter.post('/admin/login', adminLogin)
authRouter.post('/student/login', studentLogin)
authRouter.post('/lecturer/logon', lecturerLogin)

export default authRouter;