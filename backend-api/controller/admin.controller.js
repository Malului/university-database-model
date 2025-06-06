import express from 'express'
import prisma from '../prisma.js'


//Add School
export const addSchool = async (req, res) => {
    //get details
    //check if they exist
    //add school --name and code

    let {schoolCode, schoolName} = req.body;

    try {
        const existingSchool = await prisma.school.findFirst({
            where: {
                schoolCode
            }
        });

        if(existingSchool) {
            const error = new Error("School already exist");
            error.statusCode = 406;
            throw error;
        };

        const newShool = await prisma.school.create({
            data: {
                schoolCode,
                schoolName
            }
        });

        if(!newShool) {
            const error = new Error("School not created");
            error.statusCode = 406;
            throw error;        
        };

        return res.status(201).json({
            success: true,
            data: newShool
        })
    } catch (error) {

        if(error.statusCode === 406){
            return res.status(406).json({
                success: false,
                message: error.message
            }) 
        };

        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

//Add Department
export const addDepartment = async (req, res) => {
    //get details
    //check if they exist
    //add department --name and code and schoolId

    let { departmentCode, departmentName, schoolCode} = req.body;

    try {
        const existingSchool = await prisma.school.findFirst({
            where: {
                schoolCode
            }
        });

        if(!existingSchool) {
            const error = new Error("School does not exist");
            error.statusCode = 406;
            throw error;
        };

        const newDepartment = await prisma.department.create({
            data: {
                departmentCode,
                departmentName,
                schoolCode: existingSchool.schoolCode
            }
        });

        if(!newDepartment) {
            const error = new Error("Department not created");
            error.statusCode = 406;
            throw error;        
        };

        return res.status(201).json({
            success: true,
            data:newDepartment
        })
    } catch (error) {

        if(error.statusCode === 406){
            return res.status(406).json({
                success: false,
                message: error.message
            }) 
        };

        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}