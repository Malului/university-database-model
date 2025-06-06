/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Lecturer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
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
ALTER TABLE `student` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_email_key` ON `Admin`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Lecturer_email_key` ON `Lecturer`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_email_key` ON `Student`(`email`);

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
