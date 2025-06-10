-- DropIndex
DROP INDEX `Exam_Unit_unitCode_fkey` ON `exam_unit`;

-- DropIndex
DROP INDEX `Invoice_financeId_fkey` ON `invoice`;

-- DropIndex
DROP INDEX `Lecturer_Unit_courseCode_fkey` ON `lecturer_unit`;

-- DropIndex
DROP INDEX `Lecturer_Unit_unitCode_fkey` ON `lecturer_unit`;

-- DropIndex
DROP INDEX `Payment_financeId_fkey` ON `payment`;

-- DropIndex
DROP INDEX `Student_courseCode_fkey` ON `student`;

-- CreateTable
CREATE TABLE `AuditLog` (
    `id` VARCHAR(191) NOT NULL,
    `adminNo` VARCHAR(191) NOT NULL,
    `action` VARCHAR(100) NOT NULL,
    `resource` VARCHAR(100) NOT NULL,
    `resourceId` VARCHAR(191) NULL,
    `details` TEXT NULL,
    `ipAddress` VARCHAR(45) NULL,
    `userAgent` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AuditLog_adminNo_idx`(`adminNo`),
    INDEX `AuditLog_createdAt_idx`(`createdAt`),
    INDEX `AuditLog_action_idx`(`action`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_adminNo_fkey` FOREIGN KEY (`adminNo`) REFERENCES `Admin`(`adminNo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_financeId_fkey` FOREIGN KEY (`financeId`) REFERENCES `Finance`(`financeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_financeId_fkey` FOREIGN KEY (`financeId`) REFERENCES `Finance`(`financeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lecturer` ADD CONSTRAINT `Lecturer_departmentCode_fkey` FOREIGN KEY (`departmentCode`) REFERENCES `Department`(`departmentCode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lecturer_Unit` ADD CONSTRAINT `Lecturer_Unit_staffNo_fkey` FOREIGN KEY (`staffNo`) REFERENCES `Lecturer`(`staffNo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lecturer_Unit` ADD CONSTRAINT `Lecturer_Unit_unitCode_fkey` FOREIGN KEY (`unitCode`) REFERENCES `Unit`(`unitCode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lecturer_Unit` ADD CONSTRAINT `Lecturer_Unit_courseCode_fkey` FOREIGN KEY (`courseCode`) REFERENCES `Course`(`courseCode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Department` ADD CONSTRAINT `Department_schoolCode_fkey` FOREIGN KEY (`schoolCode`) REFERENCES `School`(`schoolCode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_departmentCode_fkey` FOREIGN KEY (`departmentCode`) REFERENCES `Department`(`departmentCode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_courseCode_fkey` FOREIGN KEY (`courseCode`) REFERENCES `Course`(`courseCode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_progressId_fkey` FOREIGN KEY (`progressId`) REFERENCES `StudentProgress`(`progessId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_financeId_fkey` FOREIGN KEY (`financeId`) REFERENCES `Finance`(`financeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentProgress` ADD CONSTRAINT `StudentProgress_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam`(`examId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam_Unit` ADD CONSTRAINT `Exam_Unit_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam`(`examId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam_Unit` ADD CONSTRAINT `Exam_Unit_unitCode_fkey` FOREIGN KEY (`unitCode`) REFERENCES `Unit`(`unitCode`) ON DELETE RESTRICT ON UPDATE CASCADE;
