-- CreateTable
CREATE TABLE `Admin` (
    `adminNo` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` TEXT NOT NULL,
    `role` ENUM('VC', 'DVC', 'REGISTRAR', 'FINANCE', 'SUPERADMIN') NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`adminNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Finance` (
    `financeId` VARCHAR(191) NOT NULL,
    `debit` DOUBLE NOT NULL DEFAULT 0,
    `credit` DOUBLE NOT NULL DEFAULT 0,
    `balance` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`financeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice` (
    `invoiceNo` VARCHAR(191) NOT NULL,
    `financeId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` TEXT NULL,
    `debit` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`invoiceNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `paymentId` VARCHAR(191) NOT NULL,
    `financeId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` TEXT NULL,
    `credit` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`paymentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lecturer` (
    `staffNo` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `isCOD` BOOLEAN NOT NULL DEFAULT false,
    `departmentCode` ENUM('DCST', 'DOE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Lecturer_departmentCode_idx`(`departmentCode`),
    PRIMARY KEY (`staffNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lecturer_Unit` (
    `staffNo` VARCHAR(191) NOT NULL,
    `unitCode` ENUM('CCS4401', 'BSA2203') NOT NULL,
    `courseCode` ENUM('BSCS', 'BSIT', 'BTIT') NOT NULL,
    `session` ENUM('1.1', '1.2', '2.1', '2.2', '3.1', '3.2', '4.1', '4.2') NOT NULL,

    PRIMARY KEY (`staffNo`, `unitCode`, `courseCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `School` (
    `schoolCode` ENUM('ICI', 'SOE', 'SOB') NOT NULL,
    `schoolName` VARCHAR(191) NOT NULL,
    `directorId` INTEGER NULL,

    PRIMARY KEY (`schoolCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `departmentCode` ENUM('DCST', 'DOE') NOT NULL,
    `departmentName` VARCHAR(191) NOT NULL,
    `schoolCode` ENUM('ICI', 'SOE', 'SOB') NOT NULL,

    INDEX `Department_schoolCode_idx`(`schoolCode`),
    PRIMARY KEY (`departmentCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `courseCode` ENUM('BSCS', 'BSIT', 'BTIT') NOT NULL,
    `courseName` VARCHAR(191) NOT NULL,
    `coursePeriod` INTEGER UNSIGNED NOT NULL,
    `courseLevel` ENUM('CERTIFICATE', 'DIPLOMA', 'DEGREE', 'MASTERS', 'PHD') NOT NULL,
    `courseDescription` VARCHAR(191) NULL,
    `departmentCode` ENUM('DCST', 'DOE') NOT NULL,

    INDEX `Course_departmentCode_idx`(`departmentCode`),
    PRIMARY KEY (`courseCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unit` (
    `unitCode` ENUM('CCS4401', 'BSA2203') NOT NULL,
    `unitName` VARCHAR(191) NOT NULL,
    `unitDescription` VARCHAR(191) NULL,

    PRIMARY KEY (`unitCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `regNo` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `courseCode` ENUM('BSCS', 'BSIT', 'BTIT') NOT NULL,
    `progressId` VARCHAR(191) NOT NULL,
    `financeId` VARCHAR(191) NOT NULL,
    `admissionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Student_progressId_key`(`progressId`),
    UNIQUE INDEX `Student_financeId_key`(`financeId`),
    INDEX `Student_progressId_idx`(`progressId`),
    PRIMARY KEY (`regNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentProgress` (
    `progessId` VARCHAR(191) NOT NULL,
    `session` ENUM('1.1', '1.2', '2.1', '2.2', '3.1', '3.2', '4.1', '4.2') NOT NULL,
    `registered` ENUM('UNREGISTERED', 'REGISTERED', 'DEFFERRED') NOT NULL DEFAULT 'UNREGISTERED',
    `examId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `StudentProgress_examId_key`(`examId`),
    INDEX `StudentProgress_examId_idx`(`examId`),
    PRIMARY KEY (`progessId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exam` (
    `examId` VARCHAR(191) NOT NULL,
    `totalUnits` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`examId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exam_Unit` (
    `examId` VARCHAR(191) NOT NULL,
    `unitCode` ENUM('CCS4401', 'BSA2203') NOT NULL,
    `marks` TINYINT UNSIGNED NOT NULL,
    `isPassed` BOOLEAN NOT NULL DEFAULT false,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`examId`, `unitCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
