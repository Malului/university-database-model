import jwt from 'jsonwebtoken';
import 'dotenv/config'
import prisma from '../prisma.js';

export const authorize = async (req, res, next) => {
    //check if authorization header exists
    //extract token
    //verify token
    //check if user still exists
    //attach user to req object
    //next
    //catch

    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({
                success: false,
                message: "No token provided"
            })
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { id, type } = decoded;  // type: 'admin', 'student', 'lecturer'

        let user = null;

        switch (type) {
            case 'admin':
                user = await prisma.admin.findUnique({
                    where: {
                        adminNo: id
                    },
                    select: {
                        adminNo: true,
                        firstname: true,
                        lastname: true,
                        role: true,
                        email: true
                    }
                })
                break;

            case 'student':
                user = await prisma.student.findUnique({
                    where: {
                         regNo: id
                    },
                    select: {
                        regNo: true,
                        firstname: true,
                        lastname: true,
                        email: true,
                        courseCode: true
                    }
                })
                break;

            case 'lecturer':
                user = await prisma.lecturer.findUnique({
                    where: {
                        staffNo: id
                    },
                    select: {
                        staffNo: true,
                        firstname: true,
                        lastname: true,
                        email: true,
                        isCOD: true,
                        departmentCode: true
                    }
                })
                break;

            default:
                return res.status(401). json({
                    success: false,
                    message: "Invalid token type"
                })
        }

        req.user = { ...user, type};

        next()
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token Expired"
            })
        }

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Access Denied || Forbidden"
        })
    }
}

const adminRoleHierachy = {
    FINANCE: 1,
    REGISTRAR: 2,
    DVC: 3,
    VC: 4,
    SUPERADMIN: 5
}

export const requiredAdminRole = (mininumRole) => {
    //check if req.user is available
    //get user role and required role
    //if user role < required role, deny access
    //if > next()

    return (req, res, next) => {
        if(!req.user || !req.user.type !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "Admin access required"
            })
        };

        const userRoleLevel = adminRoleHierachy[req.user.role];
        const requiredRoleLevel = adminRoleHierachy[mininumRole];

        if(userRoleLevel < requiredRoleLevel) {
            return res.status(403).json({
                success: false,
                message: `Access denied. Required ${mininumRole}, your role ${req.user.role}`
            });
        }

        next();
    }
}

//Specific admin users
export const requireFINANCE = requiredAdminRole('FINANCE');
export const requireREGISTRAR = requiredAdminRole('REGISTRAR');
export const requireDVC = requiredAdminRole('DVC');
export const requireVC = requiredAdminRole('VC');
export const requireSUPERADMIN = requiredAdminRole('SUPERADMIN');