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

-- AlterTable
ALTER TABLE `admin` MODIFY `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `exam_unit` MODIFY `marks` TINYINT UNSIGNED NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `studentprogress` MODIFY `session` ENUM('1.1', '1.2', '2.1', '2.2', '3.1', '3.2', '4.1', '4.2') NOT NULL DEFAULT '1.1';

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
