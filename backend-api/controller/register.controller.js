import express from "express";
import prisma from "../prisma.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

// REgister student
export const studentRegister = async (req, res) => {

    //try -get all details
    //start a transaction
    //Check if regNo and email exist
    // If yes throw error
    // if no -hash password, create finance, exam, progress and the a new student
    //Generate token
    try {
        let {regNo, email, password, firstname, lastname, courseCode } = req.body;

        const result = await prisma.$transaction(async (tx) => {

            //Check if student exists
            const existingStudent = await tx.student.findFirst({
                where: {regNo}
            });

            //If user exists throw error
            if(existingStudent) {
                const error = new Error(`Registration number already exists.`)
                error.statusCode = 406;
                throw error
            }

            //Generate hash password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            //Create a finance
            const finance = await tx.finance.create({
                data: {
                    debit: 0,
                    credit: 0,
                    balance: 0
                }
            });

            if(!finance) {
                const error = new Error(`Finance creation failed.`)
                error.statusCode = 406;
                throw error
            }

            //Create exam
            const exam = await tx.exam.create({
                data: {
                    totalUnits: 0
                }
            });

            if(!exam) {
                const error = new Error(`Exam creation failed.`)
                error.statusCode = 406;
                throw error
            }

            //Create progress
            const progress = await tx.studentProgress.create({
                data: {
                    examId: exam.examId
                }
            })

            if(!progress) {
                const error = new Error(`Progress creation failed.`)
                error.statusCode = 406;
                throw error
            }

            //Create a new student
            const newStudent = await tx.student.create({
                data: {
                    regNo: regNo,
                    email: email,
                    password: hashPassword,
                    progressId: progress.progessId,
                    financeId: finance.financeId,
                    firstname,
                    lastname,
                    courseCode
                },
                select: {
                    regNo: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                    course: {
                        select: {
                            courseCode: true,
                            courseName: true
                        }
                    },
                    progress: {
                        select: {
                            session: true,
                            registered: true,
                            examId: true
                        }
                    },
                    finance: {
                        select: {
                            debit: true,
                            credit: true,
                            balance: true
                        }
                    },
                    admissionDate: true
                }
            });

            if(!newStudent) {
                const error = new Error(`New student creation failed.`)
                error.statusCode = 406;
                throw error
            }

            //Generate jwt token
            const token =  jwt.sign({
                regNo: newStudent.regNo,
                email: newStudent.email,
                type: 'student'
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            return {newStudent, token}
        });

        return res.status(201).json({
            success: true,
            data: result
        })
    } catch (error) {
        if(error.statusCode === 406) {
            return res.status(406).json({
                success: false,
                message: error.message
            })
        }

        console.error(error);

        return res.status(400).json({
            success: false,
            message: "New student not created",
            error: error.message
        })
    }
}

// Register admin
export const adminRegister = async (req, res, next) => {
    //try -get all details
    //start a transaction
    //Check if regNo and email exist
    // If yes throw error
    // if no -hash password, create finance, exam, progress and the a new student
    //Generate token

    try {
        let { adminNo, firstname, lastname, email, password, role } = req.body;

        const result = await prisma.$transaction( async (tx) => {

            const existingAdmin = await tx.admin.findFirst({
                where: {
                    OR: [
                        {adminNo: adminNo},
                        {email: email}
                    ]
                }
            });

            if (existingAdmin) {
                const error = new Error("Admin already exist");
                error.statusCode = 406;
                throw error;
            }

            //Generate hash password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            const newAdmin = await tx.admin.create({
                data: {
                    adminNo,
                    firstname,
                    lastname,
                    password: hashPassword,
                    email,
                    role
                },
                select: {
                    adminNo: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                    role: true,
                    createdAt: true
                }
            });

            if(!newAdmin) {
                const error = new Error(`New admin creation failed.`)
                error.statusCode = 406;
                throw error;
            }

            //Generate jwt token
            const token =  jwt.sign({
                adminNo: newAdmin.adminNo,
                email: newAdmin.email,
                type: 'admin',
                role: newAdmin.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            return{ newAdmin, token}
        })

        return res.status(201).json({
            success: true,
            data: result
        })
    } catch (error) {
        if(error.statusCode === 406) {
            return res.status(406).json({
                success: false,
                message: error.message
            })
        }

        console.error(error);

        return res.send(400).json({
            success: false,
            message: "New user not created",
            error: error.message
        })
    }
}

// Register lecturer
export const lecturerRegister = async (req, res, next) => {
    try {
        let { staffNo, firstname, lastname, email, password, departmentCode } = req.body;

        const result = await prisma.$transaction( async (tx) => {

            //Check existing lec
            const existingLecturer = await tx.lecturer.findUnique({
                where: {
                    staffNo
                }
            });

            if(existingLecturer) {
                const error = new Error("Lecturer already exist");
                error.statusCode === 406;
                throw error;
            };

            //hash password
            const genSalt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, genSalt);

            //Check departmentCode
            const existingDepCode = await tx.department.findFirst({
                where: {
                    departmentCode: departmentCode
                }
            });

            if(!existingDepCode) {
                const error = new Error("Department does not exist");
                error.statusCode === 406;
                throw error;
            }

            const newLecturer = await tx.lecturer.create({
                data: {
                    staffNo: staffNo,
                    firstname,
                    lastname,
                    password: hashPassword,
                    departmentCode,
                    email
                }
            });

            if(!newLecturer) {
                const error = new Error("Lecturer not added");
                error.statusCode === 406;
                throw error;            
            }

            //Generate token
            const token = jwt.sign({
                staffNo: newLecturer.staffNo,
                email: newLecturer.email,
                type: 'lecturer'
            },
                process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            })


            const { password: _, newLecturerData} = newLecturer;

            return{newLecturer: newLecturerData, token}
        })

        return
    } catch (error) {
        
    }
}
