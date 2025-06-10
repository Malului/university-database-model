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
        const result = await prisma.$transaction(async (tx) => {
            const existingSchool = await tx.school.findFirst({
                where: {
                    schoolCode
                }
            });

            if(!existingSchool) {
                const error = new Error("School does not exist");
                error.statusCode = 406;
                throw error;
            };

            const newDepartment = await tx.department.create({
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

            return {newDepartment}
            })
        
        return res.status(201).json({
            success: true,
            data:result
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
            message: "New department not created"
        })
    }
}

//Add course
export const addCourse = async (req, res) => {
    //Get details
    //Check if it exist
    //add course

    try {
        let {courseCode, courseName, coursePeriod, courseLevel, courseDescription, departmentCode} = req.body;

        const result = await prisma.$transaction(async (tx) => {
            const existingCourse = await tx.course.findFirst({
                where: {
                    courseCode
                }
            });

            if(existingCourse) {
                const error = new Error("Course exist");
                error.statusCode = 406;
                throw error;
            };

            const existingDepartment = await tx.department.findFirst({
                where: {
                    departmentCode
                }
            });

            if(!existingDepartment) {
                const error = new Error("Department does not exist");
                error.statusCode = 406;
                throw error;
            };

            const newCourse = await tx.course.create({
                data: {
                    courseCode,
                    courseName,
                    coursePeriod,
                    courseLevel,
                    courseDescription,
                    departmentCode: existingDepartment.departmentCode,
                }
            });

            if(!newCourse) {
                const error = new Error(`New course creation failed.`)
                error.statusCode = 406;
                throw error
            }

            return{newCourse}
        });

        res.status(201).json({
            success: true,
            data: result
        })
    } catch (error) {
        
        if(error.statusCode === 406){
            return res.status(406).json({
                success: false,
                message: error.message
            })
        };

        console.error(error);

        return res.status(400).json({
            success: false,
            message: "New course not created"
        })
    }
}

//Add unit
export const addUnit = async (req, res) => {
    //get details
    //check if exists
    //add unit

    try {
        let { unitCode, unitName, unitDescription} = req.body;

        //Check existing unit
        const existingUnit = await prisma.unit.findFirst({
            where: {
                unitCode: unitCode
            }
        });

        if(existingUnit) {
            const error = new Error("Unit already exists");
            error.statusCode = 406;
            throw error;
        };

        const newUnit = await prisma.unit.create({
            data: {
                unitCode,
                unitName,
                unitDescription
            }
        });

        if(!newUnit) {
            const error = new Error("Unit not created");
            error.statusCode = 406;
            throw error;
        }

        return res.status(201).json({
            success: true,
            data: newUnit
        })
    } catch (error) {
        if(error.statusCode === 406){
            return res.status(406).json({
                success: false,
                message: error.message
            })
        };

        console.error(error);

        return res.status(400).json({
            success: false,
            message: "New unit not created",
            error: error.message
        })
    }
}

export const viewStudents = async (req, res) => {
    try {
        const allStudents = await prisma.student.findMany({
            select: {
                regNo: true,
                firstname: true,
                lastname: true,
                course: {
                    select: {
                        courseCode: true,
                        courseName:true
                    }
                }
            }
        });

        if(!allStudents) {
            const error = new Error("No students fetched");
            error.statusCode === 406;
            throw error;
        }

        return res.status(200).json({
            success: true,
            data: allStudents
        })
    } catch (error) {
        if(error.statusCode === 406){
            return res.status(406).json({
                success: false,
                message: error.message
            })
        };

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "No students were fetched",
            error: error.message
        })
    }
}

//Get audit logs
export const getAuditLogs = async (req, res) => {
    try {
        const { page = 1, limit = 50, adminNo, action, startDate, endDate } = req.query;
        
        const where = {};
        if (adminNo) where.adminNo = adminNo;
        if (action) where.action = action;
        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate) where.createdAt.gte = new Date(startDate);
            if (endDate) where.createdAt.lte = new Date(endDate);
        }

        const auditLogs = await prisma.auditLog.findMany({
            where,
            include: {
                admin: {
                    select: {
                        firstname: true,
                        lastname: true,
                        role: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: parseInt(limit)
        });

        const total = await prisma.auditLog.count({ where });

        return res.status(200).json({
            success: true,
            data: {
                logs: auditLogs,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch audit logs"
        });
    }
};