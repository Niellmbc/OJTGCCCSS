-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2018 at 02:16 AM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_ojt`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_classes`
--

CREATE TABLE `tbl_classes` (
  `fldClassCode` int(11) NOT NULL,
  `fldInstructorID` int(11) NOT NULL,
  `fldSubjectID` int(11) NOT NULL,
  `fldSubjectTitle` varchar(25) NOT NULL,
  `fldSubjectDay` varchar(20) NOT NULL,
  `fldSubjecTime` varchar(25) NOT NULL,
  `fldSubjectRm` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_classes`
--

INSERT INTO `tbl_classes` (`fldClassCode`, `fldInstructorID`, `fldSubjectID`, `fldSubjectTitle`, `fldSubjectDay`, `fldSubjecTime`, `fldSubjectRm`) VALUES
(1231, 1, 123, '1asd', 'mn', '00:01 12:04', 'RM12'),
(21312, 1, 42141, 'RM501', 'adasd', '12:12 12:12', 'rm502'),
(22200, 1, 17310, 'OJT Practicum 1', 'MT', '3:30-10:30', 'RM510'),
(22211, 1, 0, 'OJT1', 'mon', '00:12 14:00', 'RM501'),
(22243, 1, 0, 'Practicum1', 'Mon', '12:12 00:02', 'rm502');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cojts`
--

CREATE TABLE `tbl_cojts` (
  `fldHiredID` int(11) NOT NULL,
  `fldCompanyID` int(11) NOT NULL,
  `fldStudentID` int(11) NOT NULL,
  `fldDateHired` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_companies`
--

CREATE TABLE `tbl_companies` (
  `fldCompanyID` int(11) NOT NULL,
  `fldEmailAddress` varchar(25) NOT NULL,
  `fldPassword` varchar(25) NOT NULL,
  `fldCompanyName` varchar(50) NOT NULL,
  `fldCompanyAddress` longtext NOT NULL,
  `fldContactNo` int(11) NOT NULL,
  `fldTelNo` varchar(20) NOT NULL,
  `fldCompanyStatus` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_companies`
--

INSERT INTO `tbl_companies` (`fldCompanyID`, `fldEmailAddress`, `fldPassword`, `fldCompanyName`, `fldCompanyAddress`, `fldContactNo`, `fldTelNo`, `fldCompanyStatus`) VALUES
(1, 'gordoncollegeccs@edu.ph', '123123123', 'Gordon Busingess', '#45 Magsaysay Drive Ologapo City', 123123213, '2312312', 'Accepted'),
(2, 'gigamare@work.com', '123123123', 'GigareMare INC', '#43 Sawmill olongapo City', 123123, '123123', 'Declined'),
(3, 'asdasdsad', '123123', 'asdasd', 'asdasdasd ad asd', 1231, '123123', 'Pending'),
(4, 'sadasd@@yahoo.com', '123123', 'ASD', 'asdsa', 123123, '231123', 'Pending'),
(5, 'bellofe@gmail.com', '123123', 'Sample Company', '#45 Ardion St Olongapo City', 123123, '', 'Accepted');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_dtr`
--

CREATE TABLE `tbl_dtr` (
  `fldTransactionID` int(11) NOT NULL,
  `fldStudentID` varchar(25) NOT NULL,
  `fldTimeIn` varchar(25) NOT NULL,
  `fldTimeOut` varchar(25) NOT NULL,
  `fldDate` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_dtr`
--

INSERT INTO `tbl_dtr` (`fldTransactionID`, `fldStudentID`, `fldTimeIn`, `fldTimeOut`, `fldDate`) VALUES
(1, '1', '5', '5', '10/10/10');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_instructors`
--

CREATE TABLE `tbl_instructors` (
  `fldInstructorID` int(11) NOT NULL,
  `fldFname` varchar(25) NOT NULL,
  `fldLname` varchar(25) NOT NULL,
  `fldMname` varchar(25) NOT NULL,
  `fldEmailAddress` varchar(50) NOT NULL,
  `fldPassword` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_instructors`
--

INSERT INTO `tbl_instructors` (`fldInstructorID`, `fldFname`, `fldLname`, `fldMname`, `fldEmailAddress`, `fldPassword`) VALUES
(1, 'Mart', 'Macion', 'Salinas', 'sonic902@yaohoo.com', '123123'),
(2, 'Raniel', 'Lambaco', 'Ronquillo', 'asdasd@yahoo.com', '123123');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pendings`
--

CREATE TABLE `tbl_pendings` (
  `fldTransactionID` int(11) NOT NULL,
  `fldCompanyID` int(11) NOT NULL,
  `fldStudentID` int(11) NOT NULL,
  `fldRemarks` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_pendings`
--

INSERT INTO `tbl_pendings` (`fldTransactionID`, `fldCompanyID`, `fldStudentID`, `fldRemarks`) VALUES
(1, 1, 0, 'Cancel Invitation'),
(2, 1, 0, 'Cancel Invitation'),
(3, 1, 0, 'Selected by Company'),
(4, 1, 1, 'Cancel Invitation'),
(5, 1, 1, 'Applied by Student'),
(6, 1, 201310965, 'Cancel Invitation'),
(7, 1, 201310965, 'Selected by Company'),
(8, 1, 201310965, 'Selected by Company'),
(9, 1, 201510177, 'Selected by Company'),
(10, 1, 201510496, 'Selected by Company'),
(11, 1, 201510705, 'Selected by Company'),
(12, 1, 201510861, 'Selected by Company'),
(13, 1, 201510861, 'Selected by Company'),
(14, 1, 201610095, 'Selected by Company'),
(15, 1, 201610365, 'Selected by Company'),
(16, 1, 201610307, 'Selected by Company'),
(17, 1, 201610307, 'Selected by Company'),
(18, 1, 201610257, 'Selected by Company'),
(19, 1, 201610307, 'Selected by Company'),
(20, 1, 201610307, 'Selected by Company'),
(25, 1, 1, 'Selected by Company'),
(26, 1, 201510496, 'Selected by Company'),
(27, 1, 1, 'Selected by Company'),
(28, 1, 0, 'Selected by Company'),
(29, 1, 1, 'Selected by Company'),
(30, 1, 0, 'Selected by Company'),
(31, 1, 1, 'Selected by Company'),
(32, 1, 201310965, 'Selected by Company'),
(33, 1, 0, 'Selected by Company'),
(34, 1, 0, 'Selected by Company'),
(35, 1, 0, 'Selected by Company'),
(36, 1, 0, 'Selected by Company'),
(37, 1, 1, 'Selected by Company'),
(38, 1, 0, 'Selected by Company'),
(39, 1, 1, 'Selected by Company'),
(40, 1, 0, 'Selected by Company');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_students`
--

CREATE TABLE `tbl_students` (
  `fldStudentID` int(11) NOT NULL,
  `fldFname` varchar(25) NOT NULL,
  `fldLname` varchar(25) NOT NULL,
  `fldMname` varchar(25) NOT NULL,
  `fldPassword` varchar(25) NOT NULL,
  `fldCourse` varchar(25) NOT NULL,
  `fldClassCode` int(11) NOT NULL,
  `fldBday` varchar(25) NOT NULL,
  `fldAddress` longtext NOT NULL,
  `fldImage` longtext NOT NULL,
  `fldGender` varchar(10) NOT NULL,
  `fldStatus` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_students`
--

INSERT INTO `tbl_students` (`fldStudentID`, `fldFname`, `fldLname`, `fldMname`, `fldPassword`, `fldCourse`, `fldClassCode`, `fldBday`, `fldAddress`, `fldImage`, `fldGender`, `fldStatus`) VALUES
(0, 'Mart', 'Macion', 'Salinas', '123123', 'BSIT', 22200, '10/04/1996', '#31 Harris Street East Bajac Bajac olongapo City', 'https://scontent.fmnl17-1.fna.fbcdn.net/v/t1.0-9/30594962_1848680835156102_6696431825004265472_n.jpg?_nc_cat=0&_nc_eui2=AeH39hjoUk4cJjwmui9Imtf55WIa68TPElH5pJfz-mrcy6bk4EMa23jzM6-ipyUX9sx9XwOw5Dig-zeYu14yTxs0JDDgKuC0UU-lyV20dniupA&oh=5a1867171b44313e32e064c0918d2c93&oe=5BFCFB0A', 'Male', ''),
(1, 'Pogi', 'Mart', 'Salinas', '123123', 'BSIT', 22200, '10/04/1996', '#31 Harris Street East Bajac Bajac olongapo City', 'https://scontent.fmnl17-1.fna.fbcdn.net/v/t1.0-9/30594962_1848680835156102_6696431825004265472_n.jpg?_nc_cat=0&_nc_eui2=AeH39hjoUk4cJjwmui9Imtf55WIa68TPElH5pJfz-mrcy6bk4EMa23jzM6-ipyUX9sx9XwOw5Dig-zeYu14yTxs0JDDgKuC0UU-lyV20dniupA&oh=5a1867171b44313e32e064c0918d2c93&oe=5BFCFB0A', 'Male', ''),
(201310965, ' Fedimar Kayl', 'Rabanzo', ' Maret ', '12341234', 'BSIT  ', 22243, '', '', '', '', ''),
(201510177, ' Lawrence John ', 'Del Barrio', ' ', '12341234', 'BSIT  ', 22243, '', '', '', '', ''),
(201510496, ' Mark Ian', 'Bernardo', ' Aligada ', '12341234', 'BSIT  ', 22243, '', '', '', '', ''),
(201510705, ' Anthony Joseph', 'Calubaquib', ' Edquiban ', '12341234', 'BSIT  ', 22243, '', '', '', '', ''),
(201510764, ' Krisna', 'Vasquez', ' Agolto ', '12341234', 'BSIT  ', 22243, '', '', '', '', ''),
(201510820, ' John Matthew', 'Magno', ' Sambat ', '12341234', 'BSIT  ', 22243, '', '', '', '', ''),
(201510861, ' Lester', 'Samonte', ' Cruz ', '12341234', 'BSIT  ', 22243, '', '', '', '', ''),
(201510863, ' John Paul', 'Respicio', ' Eclevia ', '12341234', 'BSIT  ', 22243, '', '', '', '', ''),
(201510886, ' Alexandra Louise', 'Luna', ' Ayon ', '12341234', 'BSIT  ', 22243, '', '', '', '', ''),
(201610018, ' Arnold Jr.', 'Elacion', ' Gonzales ', '12341234', 'BSIT  ', 22243, '', '', '', '', ''),
(201610028, ' Jemuel Jeff', 'Lumbao', ' Bermudez ', '12341234', 'BSIT  ', 22243, '', '', '', '', ''),
(201610091, ' Joshua Martin', 'Dominguez', ' Doctolero ', '12341234', 'BSIT  ', 22243, '', '', '', '', ''),
(201610095, ' Jude', 'Asistores', ' Del Rosario ', '12341234', 'BSIT  ', 22243, '', '', '', '', ''),
(201610257, ' Lorenzo Jr.', 'Medenilla', ' Belleza ', '12341234', 'BSIT  ', 22243, '', '', '', '', ''),
(201610307, ' Ace ', 'Blancada', ' ', '12341234', 'BSIT  ', 22243, '', '', '', '', ''),
(201610365, ' Aljune', 'Nunez', ' Anoba ', '12341234', 'BSIT  ', 22243, '', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_classes`
--
ALTER TABLE `tbl_classes`
  ADD PRIMARY KEY (`fldClassCode`);

--
-- Indexes for table `tbl_cojts`
--
ALTER TABLE `tbl_cojts`
  ADD PRIMARY KEY (`fldHiredID`);

--
-- Indexes for table `tbl_companies`
--
ALTER TABLE `tbl_companies`
  ADD PRIMARY KEY (`fldCompanyID`);

--
-- Indexes for table `tbl_dtr`
--
ALTER TABLE `tbl_dtr`
  ADD PRIMARY KEY (`fldTransactionID`);

--
-- Indexes for table `tbl_instructors`
--
ALTER TABLE `tbl_instructors`
  ADD PRIMARY KEY (`fldInstructorID`);

--
-- Indexes for table `tbl_pendings`
--
ALTER TABLE `tbl_pendings`
  ADD PRIMARY KEY (`fldTransactionID`);

--
-- Indexes for table `tbl_students`
--
ALTER TABLE `tbl_students`
  ADD PRIMARY KEY (`fldStudentID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_cojts`
--
ALTER TABLE `tbl_cojts`
  MODIFY `fldHiredID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_companies`
--
ALTER TABLE `tbl_companies`
  MODIFY `fldCompanyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tbl_dtr`
--
ALTER TABLE `tbl_dtr`
  MODIFY `fldTransactionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_instructors`
--
ALTER TABLE `tbl_instructors`
  MODIFY `fldInstructorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_pendings`
--
ALTER TABLE `tbl_pendings`
  MODIFY `fldTransactionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
