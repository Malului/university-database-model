import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';
import 'dotenv/config';

//Student login
export const studentLogin = async (req, res) => {
    //Get regNo and password
    //find student
    //Verify password
    //Generate token


    try {
        const { regNo, password } = req.body;

        if (!regNo || !password) {
            return res.status(400).json({
                success: false,
                message: "Registration number and password are required"
            });
        }

        // Find student by registration number
        const student = await prisma.student.findUnique({
            where: { regNo },
            include: {
                course: {
                    select: {
                        courseCode: true,
                        courseName: true
                    }
                }
            }
        });

        if (!student) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, student.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                regNo: student.regNo, 
                email: student.email,
                type: 'student'
            },
            process.env.JWT_SECRET,
            { 
                expiresIn: process.env.JWT_EXPIRES_IN 
            }
        );

        // Return success response (exclude password)
        const { password: _, ...studentData } = student;

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                student: studentData,
                token
            }
        });

    } catch (error) {
        console.error('Student login error:', error);
        return res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
}

// Lecturer Login
export const lecturerLogin = async (req, res) => {
    try {
        const { staffNo, password } = req.body;
        
        if (!staffNo || !password) {
            return res.status(400).json({
                success: false,
                message: "Staff ID and password are required"
            });
        }

        // Find lecturer by staff ID
        const lecturer = await prisma.lecturer.findUnique({
            where: { staffNo },
            include: {
                department: {
                    select: {
                        departmentCode: true,
                        departmentName: true
                    }
                },
                courses: {
                    select: {
                        courseCode: true,
                        courseName: true
                    }
                }
            }
        });

        if (!lecturer) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, lecturer.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                staffNo: lecturer.staffNo, 
                email: lecturer.email,
                type: 'lecturer' 
            },
            process.env.JWT_SECRET,
            { 
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        // Return success response (exclude password)
        const { password: _, ...lecturerData } = lecturer;
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                lecturer: lecturerData,
                token
            }
        });

    } catch (error) {
        console.error('Lecturer login error:', error);
        return res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};

// Admin Login
export const adminLogin = async (req, res) => {
    try {
        const { adminNo, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required"
            });
        }

        // Find admin by username
        const admin = await prisma.admin.findUnique({
            where: { adminNo },
            select: {
                adminNo: true,
                firstname: true,
                lastname: true,
                email: true,
                role: true,
                password: true
            }
        });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                adminNo: admin.adminNo, 
                email: admin.email,
                type: 'admin',
                role: admin.role
            },
            process.env.JWT_SECRET,
            { 
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        // Return success response (exclude password)
        const { password: _, ...adminData } = admin;
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                admin: adminData,
                token
            }
        });

    } catch (error) {
        console.error('Admin login error:', error);
        return res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};