CREATE TABLE `student` (
  `regNo` varchar(20) PRIMARY KEY,
  `firstname` varchar(255),
  `lastname` varchar(255),
  `courseCode` CourseCode NOT NULL,
  `progressId` integer UNIQUE,
  `financeId` integer UNIQUE NOT NULL,
  `admissionDate` timestamp DEFAULT 'now()'
);

CREATE TABLE `course` (
  `courseCode` CourseCode PRIMARY KEY,
  `courseName` varchar(255),
  `coursePeriod` integer NOT NULL,
  `courseLevel` ENUM ('CERTIFICATE', 'DIPLOMA', 'DEGREE', 'MASTERS', 'PHD'),
  `courseDescription` varchar(255),
  `departmentCode` ENUM ('DCST', 'DOE') NOT NULL
);

CREATE TABLE `department` (
  `departmentCode` ENUM ('DCST', 'DOE') PRIMARY KEY,
  `departmentName` varchar(255),
  `schoolCode` SchhoolCode NOT NULL
);

CREATE TABLE `school` (
  `schoolCode` ENUM ('ICI', 'SOE', 'SOB') PRIMARY KEY,
  `schoolName` varchar(255),
  `directorId` varchar(255)
);

CREATE TABLE `unit` (
  `unitCode` ENUM ('CCS4401', 'BSA2203') PRIMARY KEY,
  `unitName` varchar(255),
  `unitDescription` varchar(255)
);

CREATE TABLE `lecturer` (
  `staffNo` varchar(255) PRIMARY KEY,
  `firstname` varchar(255),
  `lastname` varchar(255),
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `departmentCode` ENUM ('DCST', 'DOE') NOT NULL,
  `isCOD` bool DEFAULT false,
  `createdAt` timestamp DEFAULT 'now()'
);

CREATE TABLE `lecturer_unit` (
  `staffNo` varchar(255),
  `unitCode` ENUM ('CCS4401', 'BSA2203'),
  `courseCode` ENUM ('BSCS', 'BSIT', 'BTIT') NOT NULL,
  `session` ENUM ('1.1', '1.2', '1.3', '2.1') NOT NULL,
  PRIMARY KEY (`staffNo`, `unitCode`, `courseCode`)
);

CREATE TABLE `finance` (
  `financeId` integer PRIMARY KEY,
  `debit` float DEFAULT 0,
  `credit` float DEFAULT 0,
  `balance` float DEFAULT 0
);

CREATE TABLE `invoice` (
  `invoiceNo` varchar(20) PRIMARY KEY,
  `financeId` interger,
  `date` date,
  `description` varchar(255),
  `debit` float DEFAULT 0
);

CREATE TABLE `payment` (
  `paymentId` varchar(20) PRIMARY KEY,
  `financeId` integer,
  `date` date,
  `credit` float DEFAULT 0,
  `isProcessed` bool DEFAULT false
);

CREATE TABLE `studentProgress` (
  `examId` integer UNIQUE NOT NULL,
  `progressId` integer PRIMARY KEY,
  `session` ENUM ('1.1', '1.2', '1.3', '2.1'),
  `registered` ENUM ('UNREGISTERED', 'REGISTERED', 'DEFFERRED') DEFAULT 'UNREGISTERED'
);

CREATE TABLE `exam` (
  `examId` interger PRIMARY KEY,
  `totalUnit` interger DEFAULT 0
);

CREATE TABLE `exam_unit` (
  `examId` integer,
  `unitCode` ENUM ('CCS4401', 'BSA2203'),
  `marks` integer,
  `grade` ENUM ('A', 'B', 'C', 'D', 'E'),
  `isPassed` bool DEFAULT false,
  `updatedAt` timestamp DEFAULT 'now()',
  PRIMARY KEY (`examId`, `unitCode`)
);

CREATE TABLE `Admin` (
  `adminNo` varchar(50) PRIMARY KEY,
  `firstname` varchar(255),
  `lastname` varchar(255),
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` ENUM ('VC', 'DVC', 'REGISTRAR', 'FINANCE', 'SUPERADMIN') NOT NULL,
  `updatedAt` timestamp DEFAULT 'now()',
  `createdAt` timestamp DEFAULT 'now()'
);

ALTER TABLE `invoice` ADD FOREIGN KEY (`financeId`) REFERENCES `finance` (`financeId`);

ALTER TABLE `payment` ADD FOREIGN KEY (`financeId`) REFERENCES `finance` (`financeId`);

ALTER TABLE `student` ADD FOREIGN KEY (`financeId`) REFERENCES `finance` (`financeId`);

ALTER TABLE `studentProgress` ADD FOREIGN KEY (`progressId`) REFERENCES `student` (`progressId`);

ALTER TABLE `student` ADD FOREIGN KEY (`courseCode`) REFERENCES `course` (`courseCode`);

ALTER TABLE `lecturer_unit` ADD FOREIGN KEY (`staffNo`) REFERENCES `lecturer` (`staffNo`);

ALTER TABLE `lecturer_unit` ADD FOREIGN KEY (`unitCode`) REFERENCES `unit` (`unitCode`);

ALTER TABLE `course` ADD FOREIGN KEY (`courseCode`) REFERENCES `lecturer_unit` (`courseCode`);

ALTER TABLE `course` ADD FOREIGN KEY (`departmentCode`) REFERENCES `department` (`departmentCode`);

ALTER TABLE `department` ADD FOREIGN KEY (`schoolCode`) REFERENCES `school` (`schoolCode`);

ALTER TABLE `exam_unit` ADD FOREIGN KEY (`examId`) REFERENCES `exam` (`examId`);

ALTER TABLE `exam` ADD FOREIGN KEY (`examId`) REFERENCES `studentProgress` (`examId`);

ALTER TABLE `exam_unit` ADD FOREIGN KEY (`unitCode`) REFERENCES `unit` (`unitCode`);
