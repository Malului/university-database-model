import prisma from '../prisma.js';

export const auditLog = (action, resource) => {
    return async (req, res, next) => {
        const originalJson = res.json;
        
        res.json = function(data) {
            if (data.success) {
                logAuditAction(req, action, resource, data.data);
            }
            return originalJson.call(this, data);
        };
        
        next();
    };
};

const logAuditAction = async (req, action, resource, responseData) => {
    try {
        if (!req.user || req.user.type !== 'admin') return;

        await prisma.auditLog.create({
            data: {
                adminNo: req.user.adminNo,
                action,
                resource,
                resourceId: extractResourceId(responseData, resource),
                details: JSON.stringify({ requestBody: req.body }),
                ipAddress: req.ip || req.headers['x-forwarded-for']?.split(',')[0],
                userAgent: req.headers['user-agent']
            }
        });
    } catch (error) {
        console.error('Audit logging failed:', error);
    }
};

// const extractResourceId = (data, resource) => {
//     if (!data) return null;
    
//     switch (resource) {
//         case 'school': return data.schoolCode;
//         case 'department': return data.newDepartment?.departmentCode;
//         case 'course': return data.newCourse?.courseCode;
//         case 'unit': return data.unitCode;
//         default: return null;
//     }
// };

const extractResourceId = (data, resource) => {
    if (!data) return null;
    
    // Handle arrays (like viewStudents)
    if (Array.isArray(data)) {
        return `count:${data.length}`;
    }
    
    // Try to find common ID patterns
    const idFields = [
        `${resource}Code`, `${resource}Id`, `${resource}No`,
        'id', 'code', 'regNo', 'staffNo', 'adminNo'
    ];
    
    // Check direct properties first
    for (const field of idFields) {
        if (data[field]) return data[field];
    }
    
    // Check nested objects (like newDepartment, newCourse)
    const nestedKeys = Object.keys(data).filter(key => 
        key.startsWith('new') || key.includes(resource)
    );
    
    for (const key of nestedKeys) {
        if (data[key] && typeof data[key] === 'object') {
            for (const field of idFields) {
                if (data[key][field]) return data[key][field];
            }
        }
    }
    
    return null;
};