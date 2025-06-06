import express from "express";
import prisma from "../prisma.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

// REgister student
export const studentRegister = async (req, res, next) => {

    //try -get all details
    //start a transaction
    //Check if regNo and email exist
    // If yes throw error
    // if no -hash password, create finance, exam, progress and the a new student
    //Generate token
    try {
        let {regNo, email, password, ...studentData } = req.body;

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

            //Create exam
            const exam = await tx.exam.create({
                data: {
                    totalUnits: 0
                }
            })

            //Create progress
            const progress = await tx.studentprogress.create({
                data: {
                    examId: exam.examId
                }
            })

            //Create a new student
            const newStudent = await tx.student.create({
                data: {
                    regNo: regNo,
                    email: email,
                    password: hashPassword,
                    progressId: progress.progessId,
                    financeId: finance.financeId,
                    ...studentData
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

            //Generate jwt token
            const token =  jwt.sign({
                regNo: newStudent.regNo,
                email: newStudent.email,
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

}

// Register lecturer
export const lecturerRegister = async (req, res, next) => {

}
