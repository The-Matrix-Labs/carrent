-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: rentall_cars_v_2_2_3
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AdminPrivileges`
--

DROP TABLE IF EXISTS `AdminPrivileges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminPrivileges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` int NOT NULL,
  `previlegeId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `adminprivileges_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `AdminRoles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminPrivileges`
--

LOCK TABLES `AdminPrivileges` WRITE;
/*!40000 ALTER TABLE `AdminPrivileges` DISABLE KEYS */;
/*!40000 ALTER TABLE `AdminPrivileges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AdminRoles`
--

DROP TABLE IF EXISTS `AdminRoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminRoles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminRoles`
--

LOCK TABLES `AdminRoles` WRITE;
/*!40000 ALTER TABLE `AdminRoles` DISABLE KEYS */;
/*!40000 ALTER TABLE `AdminRoles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AdminUser`
--

DROP TABLE IF EXISTS `AdminUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminUser` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailConfirmed` tinyint(1) DEFAULT '0',
  `isSuperAdmin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminUser`
--

LOCK TABLES `AdminUser` WRITE;
/*!40000 ALTER TABLE `AdminUser` DISABLE KEYS */;
INSERT INTO `AdminUser` VALUES ('8b16c890-c205-11e6-a2c7-4195de507451','admin@radicalstart.com','$2a$08$SR.h58BFMCbcHbl3y9tvYe9UM.q1SMXh43M51po7FDXQrOcMpQxLy',1,1,'2016-12-14 13:59:34','2016-12-14 13:59:34',NULL);
/*!40000 ALTER TABLE `AdminUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Banner`
--

DROP TABLE IF EXISTS `Banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Banner`
--

LOCK TABLES `Banner` WRITE;
/*!40000 ALTER TABLE `Banner` DISABLE KEYS */;
INSERT INTO `Banner` VALUES (1,'Lorum Ipsum.','Lorem Ipsum is simply dummy text of the printing and typesetting industry.',1,'2019-03-27 11:53:46','2020-04-21 13:56:20','8ad801b0fe4e8d6e5aed244f4d53e525.jpeg');
/*!40000 ALTER TABLE `Banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BedTypes`
--

DROP TABLE IF EXISTS `BedTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BedTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `bedCount` int DEFAULT NULL,
  `bedType` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `bedType` (`bedType`),
  CONSTRAINT `BedTypes_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `BedTypes_ibfk_2` FOREIGN KEY (`bedType`) REFERENCES `ListSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BedTypes`
--

LOCK TABLES `BedTypes` WRITE;
/*!40000 ALTER TABLE `BedTypes` DISABLE KEYS */;
INSERT INTO `BedTypes` VALUES (2,1,1,16,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(4,2,1,16,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(8,4,1,16,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(129,3,1,16,'2019-09-13 04:30:11','2019-09-13 04:30:11'),(145,5,1,16,'2019-09-14 05:43:42','2019-09-14 05:43:42'),(154,6,1,16,'2019-09-14 10:34:07','2019-09-14 10:34:07');
/*!40000 ALTER TABLE `BedTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BlogDetails`
--

DROP TABLE IF EXISTS `BlogDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BlogDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pageTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaDescription` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pageUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `footerCategory` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BlogDetails`
--

LOCK TABLES `BlogDetails` WRITE;
/*!40000 ALTER TABLE `BlogDetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `BlogDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cancellation`
--

DROP TABLE IF EXISTS `Cancellation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cancellation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `policyName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `policyContent` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `priorDays` int NOT NULL,
  `accommodationPriorCheckIn` float NOT NULL,
  `accommodationBeforeCheckIn` float NOT NULL,
  `accommodationDuringCheckIn` float NOT NULL,
  `guestFeePriorCheckIn` float NOT NULL,
  `guestFeeBeforeCheckIn` float NOT NULL,
  `guestFeeDuringCheckIn` float NOT NULL,
  `hostFeePriorCheckIn` float NOT NULL,
  `hostFeeBeforeCheckIn` float NOT NULL,
  `hostFeeDuringCheckIn` float NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cancellation`
--

LOCK TABLES `Cancellation` WRITE;
/*!40000 ALTER TABLE `Cancellation` DISABLE KEYS */;
INSERT INTO `Cancellation` VALUES (1,'Flexible','Cancel up to 1 day prior to arrival and get a 100% refund',1,100,100,100,100,100,0,100,100,100,1,'2017-06-09 22:43:35','2017-06-09 22:43:35'),(2,'Moderate','Cancel up to 5 days prior to arrival and get a 50% refund',5,100,50,50,100,100,0,100,100,100,1,'2017-06-09 22:46:10','2017-06-09 22:46:10'),(3,'Strict','Cancel up to 7 days prior to arrival and get a 50% refund',7,50,0,0,100,100,0,100,100,100,1,'2017-06-09 22:47:38','2017-06-09 22:47:38');
/*!40000 ALTER TABLE `Cancellation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CancellationDetails`
--

DROP TABLE IF EXISTS `CancellationDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CancellationDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `cancellationPolicy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `refundToGuest` float NOT NULL,
  `payoutToHost` float NOT NULL,
  `guestServiceFee` float NOT NULL,
  `hostServiceFee` float NOT NULL,
  `total` float NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cancelledBy` enum('host','guest') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `CancellationDetails_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CancellationDetails`
--

LOCK TABLES `CancellationDetails` WRITE;
/*!40000 ALTER TABLE `CancellationDetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `CancellationDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClaimImages`
--

DROP TABLE IF EXISTS `ClaimImages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClaimImages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClaimImages`
--

LOCK TABLES `ClaimImages` WRITE;
/*!40000 ALTER TABLE `ClaimImages` DISABLE KEYS */;
/*!40000 ALTER TABLE `ClaimImages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Country`
--

DROP TABLE IF EXISTS `Country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `countryCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `countryName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime DEFAULT '2018-09-29 11:22:19',
  `updatedAt` datetime DEFAULT '2018-09-29 11:22:19',
  `dialCode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=242 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Country`
--

LOCK TABLES `Country` WRITE;
/*!40000 ALTER TABLE `Country` DISABLE KEYS */;
INSERT INTO `Country` VALUES (1,'DZ','Algeria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+213'),(2,'AF','Afghanistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+93'),(3,'AL','Albania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+355'),(4,'AS','AmericanSamoa',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 684'),(5,'AD','Andorra',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+376'),(6,'AO','Angola',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+244'),(7,'AI','Anguilla',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 264'),(8,'AQ','Antarctica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+672'),(9,'AG','Antigua and Barbuda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1268'),(10,'AR','Argentina',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+54'),(11,'AM','Armenia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+374'),(12,'AW','Aruba',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+297'),(13,'AU','Australia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+61'),(14,'AT','Austria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+43'),(15,'AZ','Azerbaijan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+994'),(16,'BS','Bahamas',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 242'),(17,'BH','Bahrain',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+973'),(18,'BD','Bangladesh',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+880'),(19,'BB','Barbados',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 246'),(20,'BY','Belarus',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+375'),(21,'BE','Belgium',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+32'),(22,'BZ','Belize',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+501'),(23,'BJ','Benin',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+229'),(24,'BM','Bermuda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 441'),(25,'BT','Bhutan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+975'),(26,'BO','Bolivia, Plurinational State of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+591'),(27,'BA','Bosnia and Herzegovina',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+387'),(28,'BW','Botswana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+267'),(29,'BR','Brazil',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+55'),(30,'IO','British Indian Ocean Territory',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+246'),(31,'BN','Brunei Darussalam',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+673'),(32,'BG','Bulgaria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+359'),(33,'BF','Burkina Faso',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+226'),(34,'BI','Burundi',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+257'),(35,'KH','Cambodia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+855'),(36,'CM','Cameroon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+237'),(37,'CA','Canada',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1'),(38,'CV','Cape Verde',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+238'),(39,'KY','Cayman Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+ 345'),(40,'CF','Central African Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+236'),(41,'TD','Chad',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+235'),(42,'CL','Chile',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+56'),(43,'CN','China',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+86'),(44,'CX','Christmas Island',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+61'),(45,'CC','Cocos (Keeling) Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+61'),(46,'CO','Colombia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+57'),(47,'KM','Comoros',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+269'),(48,'CG','Congo',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+242'),(49,'CD','Congo, The Democratic Republic of the',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+243'),(50,'CK','Cook Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+682'),(51,'CR','Costa Rica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+506'),(52,'CI','Cote d\'Ivoire',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+225'),(53,'HR','Croatia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+385'),(54,'CU','Cuba',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+53'),(55,'CY','Cyprus',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+537'),(56,'CZ','Czech Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+420'),(57,'DK','Denmark',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+45'),(58,'DJ','Djibouti',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+253'),(59,'DM','Dominica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 767'),(60,'DO','Dominican Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 849'),(61,'EC','Ecuador',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+593'),(62,'EG','Egypt',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+20'),(63,'SV','El Salvador',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+503'),(64,'GQ','Equatorial Guinea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+240'),(65,'ER','Eritrea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+291'),(66,'EE','Estonia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+372'),(67,'ET','Ethiopia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+251'),(68,'FK','Falkland Islands (Malvinas)',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+500'),(69,'FO','Faroe Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+298'),(70,'FJ','Fiji',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+679'),(71,'FI','Finland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+358'),(72,'FR','France',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+33'),(73,'GF','French Guiana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+594'),(74,'PF','French Polynesia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+689'),(75,'GA','Gabon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+241'),(76,'GM','Gambia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+220'),(77,'GE','Georgia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+995'),(78,'DE','Germany',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+49'),(79,'GH','Ghana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+233'),(80,'GI','Gibraltar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+350'),(81,'GR','Greece',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+30'),(82,'GL','Greenland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+299'),(83,'GD','Grenada',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 473'),(84,'GP','Guadeloupe',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+590'),(85,'GU','Guam',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 671'),(86,'GT','Guatemala',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+502'),(87,'GG','Guernsey',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(88,'GN','Guinea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+224'),(89,'GW','Guinea-Bissau',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+245'),(90,'GY','Guyana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+595'),(91,'HT','Haiti',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+509'),(92,'VA','Holy See (Vatican City State)',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+379'),(93,'HN','Honduras',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+504'),(94,'HK','Hong Kong',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+852'),(95,'HU','Hungary',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+36'),(96,'IS','Iceland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+354'),(97,'IN','India',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+91'),(98,'ID','Indonesia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+62'),(99,'IR','Iran, Islamic Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+98'),(100,'IQ','Iraq',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+964'),(101,'IE','Ireland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+353'),(102,'IM','Isle of Man',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(103,'IL','Israel',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+972'),(104,'IT','Italy',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+39'),(105,'JM','Jamaica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 876'),(106,'JP','Japan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+81'),(107,'JE','Jersey',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(108,'JO','Jordan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+962'),(109,'KZ','Kazakhstan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+7 7'),(110,'KE','Kenya',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+254'),(111,'KI','Kiribati',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+686'),(112,'KP','Korea, Democratic People\'s Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+850'),(113,'KR','Korea, Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+82'),(114,'KW','Kuwait',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+965'),(115,'KG','Kyrgyzstan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+996'),(116,'LA','Lao People\'s Democratic Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+856'),(117,'LV','Latvia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+371'),(118,'LB','Lebanon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+961'),(119,'LS','Lesotho',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+266'),(120,'LR','Liberia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+231'),(121,'LY','Libyan Arab Jamahiriya',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+218'),(122,'LI','Liechtenstein',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+423'),(123,'LT','Lithuania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+370'),(124,'LU','Luxembourg',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+352'),(125,'MO','Macao',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+853'),(126,'MK','Macedonia, The Former Yugoslav Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+389'),(127,'MG','Madagascar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+261'),(128,'MW','Malawi',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+265'),(129,'MY','Malaysia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+60'),(130,'MV','Maldives',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+960'),(131,'ML','Mali',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+223'),(132,'MT','Malta',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+356'),(133,'MH','Marshall Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+692'),(134,'MQ','Martinique',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+596'),(135,'MR','Mauritania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+222'),(136,'MU','Mauritius',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+230'),(137,'YT','Mayotte',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+262'),(138,'MX','Mexico',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+52'),(139,'FM','Micronesia, Federated States of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+691'),(140,'MD','Moldova, Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+373'),(141,'MC','Monaco',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+377'),(142,'MN','Mongolia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+976'),(143,'ME','Montenegro',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+382'),(144,'MS','Montserrat',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1664'),(145,'MA','Morocco',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+212'),(146,'MZ','Mozambique',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+258'),(147,'MM','Myanmar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+95'),(148,'NA','Namibia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+264'),(149,'NR','Nauru',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+674'),(150,'NP','Nepal',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+977'),(151,'NL','Netherlands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+31'),(152,'AN','Netherlands Antilles',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+599'),(153,'NC','New Caledonia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+687'),(154,'NZ','New Zealand',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+64'),(155,'NI','Nicaragua',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+505'),(156,'NE','Niger',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+227'),(157,'NG','Nigeria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+234'),(158,'NU','Niue',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+683'),(159,'NF','Norfolk Island',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+672'),(160,'MP','Northern Mariana Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 670'),(161,'NO','Norway',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+47'),(162,'OM','Oman',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+968'),(163,'PK','Pakistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+92'),(164,'PW','Palau',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+680'),(165,'PS','Palestinian Territory, Occupied',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+970'),(166,'PA','Panama',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+507'),(167,'PG','Papua New Guinea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+675'),(168,'PY','Paraguay',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+595'),(169,'PE','Peru',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+51'),(170,'PH','Philippines',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+63'),(171,'PN','Pitcairn',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+872'),(172,'PL','Poland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+48'),(173,'PT','Portugal',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+351'),(174,'PR','Puerto Rico',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 939'),(175,'QA','Qatar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+974'),(176,'RO','Romania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+40'),(177,'RU','Russia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+7'),(178,'RW','Rwanda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+250'),(179,'RE','Réunion',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+262'),(180,'BL','Saint Barthélemy',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+590'),(181,'SH','Saint Helena, Ascension and Tristan Da Cunha',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+290'),(182,'KN','Saint Kitts and Nevis',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 869'),(183,'LC','Saint Lucia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 758'),(184,'MF','Saint Martin',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+590'),(185,'PM','Saint Pierre and Miquelon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+508'),(186,'VC','Saint Vincent and the Grenadines',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 784'),(187,'WS','Samoa',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+685'),(188,'SM','San Marino',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+378'),(189,'ST','Sao Tome and Principe',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+239'),(190,'SA','Saudi Arabia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+966'),(191,'SN','Senegal',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+221'),(192,'RS','Serbia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+381'),(193,'SC','Seychelles',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+248'),(194,'SL','Sierra Leone',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+232'),(195,'SG','Singapore',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+65'),(196,'SK','Slovakia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+421'),(197,'SI','Slovenia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+386'),(198,'SB','Solomon Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+677'),(199,'SO','Somalia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+252'),(200,'ZA','South Africa',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+27'),(201,'GS','South Georgia and the South Sandwich Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+500'),(202,'ES','Spain',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+34'),(203,'LK','Sri Lanka',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+94'),(204,'SD','Sudan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+249'),(205,'SR','Suriname',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+597'),(206,'SJ','Svalbard and Jan Mayen',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+47'),(207,'SZ','Swaziland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+268'),(208,'SE','Sweden',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+46'),(209,'CH','Switzerland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+41'),(210,'SY','Syrian Arab Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+963'),(211,'TW','Taiwan, Province of China',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+886'),(212,'TJ','Tajikistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+992'),(213,'TZ','Tanzania, United Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+255'),(214,'TH','Thailand',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+66'),(215,'TL','Timor-Leste',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+670'),(216,'TG','Togo',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+228'),(217,'TK','Tokelau',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+690'),(218,'TO','Tonga',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+676'),(219,'TT','Trinidad and Tobago',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 868'),(220,'TN','Tunisia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+216'),(221,'TR','Turkey',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+90'),(222,'TM','Turkmenistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+993'),(223,'TC','Turks and Caicos Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 649'),(224,'TV','Tuvalu',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+688'),(225,'UG','Uganda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+256'),(226,'UA','Ukraine',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+380'),(227,'AE','United Arab Emirates',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+971'),(228,'GB','United Kingdom',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(229,'US','United States',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1'),(230,'UY','Uruguay',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+598'),(231,'UZ','Uzbekistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+998'),(232,'VU','Vanuatu',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+678'),(233,'VE','Venezuela, Bolivarian Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+58'),(234,'VN','Viet Nam',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+84'),(235,'VG','Virgin Islands, British',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 284'),(236,'VI','Virgin Islands, U.S.',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 340'),(237,'WF','Wallis and Futuna',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+681'),(238,'YE','Yemen',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+967'),(239,'ZM','Zambia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+260'),(240,'ZW','Zimbabwe',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+263'),(241,'AX','Åland Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+358');
/*!40000 ALTER TABLE `Country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Currencies`
--

DROP TABLE IF EXISTS `Currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Currencies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `isBaseCurrency` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isPayment` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Currencies`
--

LOCK TABLES `Currencies` WRITE;
/*!40000 ALTER TABLE `Currencies` DISABLE KEYS */;
INSERT INTO `Currencies` VALUES (1,'AUD',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(2,'BGN',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(3,'BRL',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(4,'CAD',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(5,'CHF',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(6,'CNY',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(7,'CZK',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(8,'DKK',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(9,'EUR',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(10,'GBP',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(11,'HKD',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(12,'HRK',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(13,'HUF',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(14,'IDR',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(15,'ILS',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(16,'INR',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(17,'JPY',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(18,'KRW',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(19,'MXN',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(20,'MYR',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(21,'NOK',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(22,'NZD',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(23,'PHP',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(24,'PLN',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(25,'RON',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(26,'RUB',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(27,'SEK',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(28,'SGD',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(29,'THB',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(30,'TRY',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(31,'USD',1,1,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(32,'ZAR',0,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0);
/*!40000 ALTER TABLE `Currencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CurrencyRates`
--

DROP TABLE IF EXISTS `CurrencyRates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CurrencyRates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `currencyCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` float NOT NULL,
  `isBase` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=188 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CurrencyRates`
--

LOCK TABLES `CurrencyRates` WRITE;
/*!40000 ALTER TABLE `CurrencyRates` DISABLE KEYS */;
INSERT INTO `CurrencyRates` VALUES (1,'AED',3.67,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(2,'AFN',78.52,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(3,'ALL',108.2,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(4,'AMD',476.01,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(5,'ANG',1.79,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(6,'AOA',362.02,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(7,'ARS',55.98,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(8,'AUD',1.47,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(9,'AWG',1.8,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(10,'AZN',1.7,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(11,'BAM',1.74,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(12,'BAT',5.60961,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(13,'BBD',2,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(14,'BCH',0.00324786,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(15,'BDT',84.6,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(16,'BGN',1.75,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(17,'BHD',0.377,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(18,'BIF',1843,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(19,'BMD',1,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(20,'BND',1.35,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(21,'BOB',6.92,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(22,'BRL',3.95,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(23,'BSD',1,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(24,'BSV',0.00828891,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(25,'BTC',0.000098,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(26,'BTN',71.1,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(27,'BWP',11.06,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(28,'BYN',2.04,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(29,'BYR',20536,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(30,'BZD',2.02,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(31,'CAD',1.32,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(32,'CDF',1654.07,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(33,'CHF',0.97,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(34,'CLF',0.025,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(35,'CLP',707,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(36,'CNH',7.02,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(37,'CNY',7.04,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(38,'COP',3435.53,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(39,'CRC',572.65,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(40,'CUC',1,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(41,'CVE',98.31,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(42,'CZK',23.08,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(43,'DAI',0.994563,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(44,'DJF',178,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(45,'DKK',6.67,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(46,'DOP',50.95,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(47,'DZD',119.58,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(48,'EEK',14.61,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(49,'EGP',16.59,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(50,'EOS',0.2458,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(51,'ERN',15,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(52,'ETB',29.17,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(53,'ETC',0.160167,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(54,'ETH',0.0050463,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(55,'EUR',0.89,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(56,'FJD',2.18,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(57,'FKP',0.83,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(58,'GBP',0.83,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(59,'GEL',2.92,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(60,'GGP',0.83,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(61,'GHS',5.43,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(62,'GIP',0.83,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(63,'GMD',50.12,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(64,'GNF',9188,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(65,'GTQ',7.68,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(66,'GYD',208.95,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(67,'HKD',7.85,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(68,'HNL',24.49,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(69,'HRK',6.61,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(70,'HTG',94.89,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(71,'HUF',289,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(72,'IDR',14195.8,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(73,'ILS',3.48,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(74,'IMP',0.83,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(75,'INR',70.93,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(76,'IQD',1193.26,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(77,'ISK',124,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(78,'JEP',0.83,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(79,'JMD',134.38,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(80,'JOD',0.709,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(81,'JPY',107,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(82,'KES',103.41,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(83,'KGS',69.64,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(84,'KHR',4086.34,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(85,'KMF',440,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(86,'KRW',1210,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(87,'KWD',0.304,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(88,'KYD',0.83,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(89,'KZT',387.58,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(90,'LAK',8695.51,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(91,'LBP',1512.25,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(92,'LINK',0.636472,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(93,'LKR',176.96,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(94,'LRD',203,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(95,'LSL',15.3,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(96,'LTC',0.0137137,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(97,'LTL',3.22,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(98,'LVL',0.66,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(99,'LYD',1.403,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(100,'MAD',9.55,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(101,'MDL',17.42,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(102,'MGA',3685.6,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(103,'MKD',54.83,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(104,'MMK',1510.61,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(105,'MNT',2664.78,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(106,'MOP',8.08,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(107,'MRO',357,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(108,'MTL',0.68,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(109,'MUR',35.9,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(110,'MVR',15.5,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(111,'MWK',729.06,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(112,'MXN',19.47,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(113,'MYR',4.19,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(114,'MZN',60.44,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(115,'NAD',15.3,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(116,'NGN',363.76,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(117,'NIO',33.53,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(118,'NOK',8.91,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(119,'NPR',113.76,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(120,'NZD',1.55,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(121,'OMR',0.385,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(122,'PAB',1,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(123,'PEN',3.38,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(124,'PGK',3.4,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(125,'PHP',51.92,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(126,'PKR',160.25,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(127,'PLN',3.88,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(128,'PYG',6083,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(129,'QAR',3.64,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(130,'REP',0.0966184,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(131,'RON',4.22,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(132,'RSD',105.19,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(133,'RUB',65.06,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(134,'RWF',918,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(135,'SAR',3.75,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(136,'SBD',8.22,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(137,'SCR',13.71,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(138,'SEK',9.55,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(139,'SGD',1.38,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(140,'SHP',0.83,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(141,'SLL',8406.47,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(142,'SOS',578.55,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(143,'SRD',7.46,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(144,'SSP',130.26,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(145,'STD',21560.8,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(146,'SVC',8.75,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(147,'SZL',15.3,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(148,'THB',30.85,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(149,'TJS',9.43,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(150,'TMT',3.5,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(151,'TND',2.843,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(152,'TOP',2.31,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(153,'TRY',5.59,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(154,'TTD',6.78,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(155,'TWD',31.15,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(156,'TZS',2302.2,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(157,'UAH',25.16,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(158,'UGX',3695,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(159,'USD',1,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(160,'USDC',1,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(161,'UYU',35.36,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(162,'UZS',8687.82,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(163,'VEF',248488,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(164,'VES',7163.69,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(165,'VND',23262,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(166,'VUV',116,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(167,'WST',2.64,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(168,'XAF',586,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(169,'XAG',0,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(170,'XAU',0,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(171,'XCD',2.7,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(172,'XDR',1,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(173,'XLM',17.1606,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(174,'XOF',586,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(175,'XPD',0,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(176,'XPF',107,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(177,'XPT',0,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(178,'XRP',3.82336,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(179,'XTZ',1.00472,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(180,'YER',250.35,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(181,'ZAR',15.16,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(182,'ZEC',0.0208268,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(183,'ZMK',5253.08,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(184,'ZMW',13.03,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(185,'ZRX',6.10385,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(186,'ZWL',322,0,'2019-09-17 07:33:12','2019-09-17 07:33:12'),(187,'USD',1,1,'2019-09-17 07:33:12','2019-09-17 07:33:12');
/*!40000 ALTER TABLE `CurrencyRates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DocumentVerification`
--

DROP TABLE IF EXISTS `DocumentVerification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DocumentVerification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fileName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fileType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `documentStatus` enum('pending','approved') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocumentVerification`
--

LOCK TABLES `DocumentVerification` WRITE;
/*!40000 ALTER TABLE `DocumentVerification` DISABLE KEYS */;
/*!40000 ALTER TABLE `DocumentVerification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EmailToken`
--

DROP TABLE IF EXISTS `EmailToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EmailToken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `EmailToken_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EmailToken`
--

LOCK TABLES `EmailToken` WRITE;
/*!40000 ALTER TABLE `EmailToken` DISABLE KEYS */;
INSERT INTO `EmailToken` VALUES (1,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6','demo@radicalstart.com','1553672955896','2019-03-27 07:49:16','2019-03-27 07:49:16'),(2,'977bc550-5069-11e9-a14e-635e0fd3bfa6','qa@radicalstart.com','1553675005475','2019-03-27 08:23:25','2019-03-27 08:23:25');
/*!40000 ALTER TABLE `EmailToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FailedTransactionHistory`
--

DROP TABLE IF EXISTS `FailedTransactionHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FailedTransactionHistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` float NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transactionId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentMethodId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `failedtransactionhistory_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FailedTransactionHistory`
--

LOCK TABLES `FailedTransactionHistory` WRITE;
/*!40000 ALTER TABLE `FailedTransactionHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `FailedTransactionHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FooterBlock`
--

DROP TABLE IF EXISTS `FooterBlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FooterBlock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content1` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content2` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content3` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FooterBlock`
--

LOCK TABLES `FooterBlock` WRITE;
/*!40000 ALTER TABLE `FooterBlock` DISABLE KEYS */;
INSERT INTO `FooterBlock` VALUES (1,'24/7 customer support','Lorem Ipsum is simply dummy text of the printing and typesetting industry 000 000 0000 000.','Verified ID','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','Security Assurance','Lorem Ipsum is simply dummy text of the printing and typesetting industry.',1,'2018-05-22 11:12:19','2019-09-16 17:43:41'),(2,'one','hkh','one ','jkjh','one ','nknk',1,'2018-05-22 11:14:18','2018-05-22 11:14:18'),(3,'one','hkhih','one ','nhjlkhk','one ','klnklh',1,'2018-05-22 11:15:07','2018-05-22 11:15:07'),(4,'fdf','fdsfds','fdsfd','fdsfds','fdsff','fdssdfds',1,'2018-05-22 11:34:58','2018-05-22 11:34:58'),(5,'fdf','fdsfds','fdsfd','fdsfds','fdsff','fdss',1,'2018-05-22 11:35:14','2018-05-22 11:35:14'),(6,'fdf','fdsfds','fdsf','fdsfd','fds','fdss',1,'2018-05-22 11:39:06','2018-05-22 11:39:06');
/*!40000 ALTER TABLE `FooterBlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ForgotPassword`
--

DROP TABLE IF EXISTS `ForgotPassword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ForgotPassword` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `ForgotPassword_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ForgotPassword`
--

LOCK TABLES `ForgotPassword` WRITE;
/*!40000 ALTER TABLE `ForgotPassword` DISABLE KEYS */;
/*!40000 ALTER TABLE `ForgotPassword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ImageBanner`
--

DROP TABLE IF EXISTS `ImageBanner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ImageBanner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `buttonLabel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ImageBanner`
--

LOCK TABLES `ImageBanner` WRITE;
/*!40000 ALTER TABLE `ImageBanner` DISABLE KEYS */;
INSERT INTO `ImageBanner` VALUES (1,'Lorem Ipsum is simply dummy text','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','Lorem Ipsum','65c72ceb54caf6b90ac8cb9b2595e6d1.jpeg','2019-03-27 11:53:47','2019-09-16 17:43:08');
/*!40000 ALTER TABLE `ImageBanner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListBlockedDates`
--

DROP TABLE IF EXISTS `ListBlockedDates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListBlockedDates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `reservationId` int DEFAULT NULL,
  `blockedDates` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `calendarId` int DEFAULT NULL,
  `calendarStatus` enum('available','blocked','reservation') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isSpecialPrice` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `ListBlockedDates_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ListBlockedDates_ibfk_2` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListBlockedDates`
--

LOCK TABLES `ListBlockedDates` WRITE;
/*!40000 ALTER TABLE `ListBlockedDates` DISABLE KEYS */;
/*!40000 ALTER TABLE `ListBlockedDates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListCalendar`
--

DROP TABLE IF EXISTS `ListCalendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListCalendar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ListCalendar_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListCalendar`
--

LOCK TABLES `ListCalendar` WRITE;
/*!40000 ALTER TABLE `ListCalendar` DISABLE KEYS */;
/*!40000 ALTER TABLE `ListCalendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListPhotos`
--

DROP TABLE IF EXISTS `ListPhotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListPhotos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `isCover` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ListPhotos_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListPhotos`
--

LOCK TABLES `ListPhotos` WRITE;
/*!40000 ALTER TABLE `ListPhotos` DISABLE KEYS */;
INSERT INTO `ListPhotos` VALUES (1,1,'ecb5d99011fefb489dda1143f3afae38.jpeg','image/jpeg',0,'2019-08-23 12:02:52','2019-08-23 12:02:52'),(2,1,'a5386c08cbbb82e6bf898bdc554879b7.jpeg','image/jpeg',0,'2019-08-23 12:02:52','2019-08-23 12:02:52'),(3,1,'77bbfc7f942856fad4c7d3cb2ea6a8e4.jpeg','image/jpeg',0,'2019-08-23 12:02:53','2019-08-23 12:02:53'),(4,1,'bea34f1da17b45c76ebef17621c2635a.jpeg','image/jpeg',0,'2019-08-23 12:02:53','2019-08-23 12:02:53'),(5,1,'4f5ead9ad6c69e987ecf6c0db935db5f.jpeg','image/jpeg',0,'2019-08-23 12:02:54','2019-08-23 12:02:54'),(6,1,'14906d68cb79f41ea8c6a3bf6784403e.jpeg','image/jpeg',0,'2019-08-23 12:02:54','2019-08-23 12:02:54'),(7,1,'e36036a0710fdb1e3f0bec1469c63d9d.jpeg','image/jpeg',0,'2019-08-23 12:02:54','2019-08-23 12:02:54'),(8,2,'51ca34d7f610ce94eb9daa8194c06f4e.jpeg','image/jpeg',0,'2019-08-23 12:19:09','2019-08-23 12:19:09'),(9,2,'afead55fd0cb6593b076943999af8a8b.jpeg','image/jpeg',0,'2019-08-23 12:19:09','2019-08-23 12:19:09'),(10,2,'6a0a0b69bf6e0068f619606f2c2a80e5.jpeg','image/jpeg',0,'2019-08-23 12:19:11','2019-08-23 12:19:11'),(11,2,'ee44a200cb12ef1de6bd930ccac0b627.jpeg','image/jpeg',0,'2019-08-23 12:19:11','2019-08-23 12:19:11'),(12,2,'fc2cb2a1924dcc49945178073bdba98c.jpeg','image/jpeg',0,'2019-08-23 12:19:11','2019-08-23 12:19:11'),(13,2,'7fd621cfc1a51897126ff78c25abe83a.jpeg','image/jpeg',0,'2019-08-23 12:19:11','2019-08-23 12:19:11'),(14,2,'03789c9a5eb7d854e030ff8f14b650d2.jpeg','image/jpeg',0,'2019-08-23 12:19:12','2019-08-23 12:19:12'),(15,2,'bade3862dc1bbc136d0f987c459aa7a4.jpeg','image/jpeg',0,'2019-08-23 12:19:12','2019-08-23 12:19:12'),(16,3,'20a1cb739030ba33199c41555c662eef.jpeg','image/jpeg',0,'2019-08-23 12:32:00','2019-08-23 12:32:00'),(17,3,'d5b4a7c80510f17bc1b1b1de6330a2aa.jpeg','image/jpeg',0,'2019-08-23 12:32:01','2019-08-23 12:32:01'),(18,3,'0edd8ab9237aafac9d6e67005e65bb60.jpeg','image/jpeg',0,'2019-08-23 12:32:01','2019-08-23 12:32:01'),(19,3,'11f91b61b0dae42e40597319337a8b3c.jpeg','image/jpeg',0,'2019-08-23 12:32:01','2019-08-23 12:32:01'),(20,3,'d9e8c4c3ca1ba5a0f94108858b1b868b.jpeg','image/jpeg',0,'2019-08-23 12:32:01','2019-08-23 12:32:01'),(21,4,'60b7cdc8c51efbaa25eec15cd16b9eb9.jpeg','image/jpeg',0,'2019-08-23 12:42:08','2019-08-23 12:42:08'),(22,4,'f58ff61a00b80b09a376186b3e76c796.jpeg','image/jpeg',0,'2019-08-23 12:42:09','2019-08-23 12:42:09'),(23,4,'efdd5280e0e27e8d731021d8aaa917b4.jpeg','image/jpeg',0,'2019-08-23 12:42:19','2019-08-23 12:42:19'),(24,4,'5fc52f50e65b21dfef6952f2cca8cc0f.jpeg','image/jpeg',0,'2019-08-23 12:42:19','2019-08-23 12:42:19'),(25,4,'4139106eec569f688d6c1bbb6316da6a.jpeg','image/jpeg',0,'2019-08-23 12:42:52','2019-08-23 12:42:52'),(26,5,'b1a4d30b8e56ea6ac74d3483825b2c4b.jpeg','image/jpeg',0,'2019-08-23 12:49:24','2019-08-23 12:49:24'),(27,5,'3e19b74558bc0c36ceda752ab965d644.jpeg','image/jpeg',0,'2019-08-23 12:49:24','2019-08-23 12:49:24'),(28,5,'439b6934fa28ec34f707aeb8eb6e7e45.jpeg','image/jpeg',0,'2019-08-23 12:49:24','2019-08-23 12:49:24'),(29,5,'b5a9cefcb30adb7c2c30fd773c604c49.jpeg','image/jpeg',0,'2019-08-23 12:49:25','2019-08-23 12:49:25'),(30,5,'96175d30e3e8169eb57f831e205d618b.jpeg','image/jpeg',0,'2019-08-23 12:49:25','2019-08-23 12:49:25'),(31,5,'7ffe31219c3314238ea17d5e68049270.jpeg','image/jpeg',0,'2019-08-23 12:49:26','2019-08-23 12:49:26'),(32,6,'ae49af4d2244e22cb4ca51d9fbc24258.jpeg','image/jpeg',0,'2019-08-23 13:02:09','2019-08-23 13:02:09'),(33,6,'08b769956ac55aa9d710f7d88f924914.jpeg','image/jpeg',0,'2019-08-23 13:02:09','2019-08-23 13:02:09'),(34,6,'f3a661de64a322ebab3c7eac26054f4b.jpeg','image/jpeg',0,'2019-08-23 13:02:27','2019-08-23 13:02:27'),(35,6,'f8485b6b1119624133cb54535b9a447c.jpeg','image/jpeg',0,'2019-08-23 13:02:27','2019-08-23 13:02:27');
/*!40000 ALTER TABLE `ListPhotos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListSettings`
--

DROP TABLE IF EXISTS `ListSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `typeId` int NOT NULL,
  `itemName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `otherItemName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `maximum` int DEFAULT NULL,
  `minimum` int DEFAULT NULL,
  `startValue` int DEFAULT NULL,
  `endValue` int DEFAULT NULL,
  `step` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isEnable` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `itemDescription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `makeType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `typeId` (`typeId`),
  CONSTRAINT `ListSettings_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `ListSettingsTypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=189 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListSettings`
--

LOCK TABLES `ListSettings` WRITE;
/*!40000 ALTER TABLE `ListSettings` DISABLE KEYS */;
INSERT INTO `ListSettings` VALUES (5,3,'Ford Figo',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:35','2019-08-07 05:08:52',NULL,'136'),(6,3,'Renault Kwid',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:42','2019-08-07 05:08:06',NULL,'136'),(7,3,'Toyota Camry',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:49','2019-08-10 05:00:42',NULL,'130'),(10,4,'2012',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:49:23','2019-08-23 07:58:56',NULL,NULL),(11,4,'2013',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:49:35','2019-08-23 07:58:49',NULL,NULL),(14,5,'bedroom  ','bedrooms ',NULL,NULL,1,10,NULL,'1','2017-01-09 07:53:04','2018-05-02 04:54:59',NULL,NULL),(15,6,'bed','beds',NULL,NULL,1,16,NULL,'1','2017-01-09 07:53:48','2018-04-28 04:50:39',NULL,NULL),(16,7,'Single',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:59:47','2017-01-09 07:59:47',NULL,NULL),(17,7,'Double',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:59:57','2017-01-09 07:59:57',NULL,NULL),(18,7,'Queen',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:00:05','2017-01-09 08:00:05',NULL,NULL),(19,7,'King',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:00:13','2017-01-09 08:00:13',NULL,NULL),(20,7,'Bunk bed',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:00:20','2017-01-09 08:00:20',NULL,NULL),(21,8,'bathroom','bathrooms',NULL,NULL,1,8,NULL,'1','2017-01-09 08:12:24','2018-04-10 07:04:01',NULL,NULL),(22,9,'Private Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:31:16','2017-01-09 08:31:16',NULL,NULL),(23,9,'Shared Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:31:28','2017-01-09 08:31:28',NULL,NULL),(24,9,'Other',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:31:32','2017-01-09 08:31:32',NULL,NULL),(25,10,'Multiple 12V power outlets',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:43:32','2019-08-07 05:12:18',NULL,NULL),(26,10,'Fog lamps',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:43:42','2019-08-07 05:12:06',NULL,NULL),(27,10,'Traction control',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:43:51','2019-08-07 05:11:49',NULL,NULL),(28,10,'Head restraints',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:00','2019-08-07 05:11:39',NULL,NULL),(29,11,'Smoke detector',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:17','2017-01-09 08:44:17',NULL,NULL),(30,11,'Carbon monoxide detector',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:25','2017-01-09 08:44:25',NULL,NULL),(31,11,'First aid kit ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:33','2017-01-09 08:44:33',NULL,NULL),(32,11,'Safety card',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:41','2017-01-09 08:44:41',NULL,NULL),(33,12,'Kitchen',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:19','2017-01-09 09:05:19',NULL,NULL),(34,12,'Laundry – washer ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:26','2017-01-09 09:05:26',NULL,NULL),(35,12,'Laundry – dryer',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:33','2017-01-09 09:05:33',NULL,NULL),(36,12,'Parking',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:40','2017-01-09 09:05:40',NULL,NULL),(39,2,'guest','guests',NULL,NULL,1,20,NULL,'1','2017-01-09 10:51:56','2018-05-22 08:47:42',NULL,NULL),(45,13,'Payment information',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 07:48:16','2019-09-05 15:36:11',NULL,NULL),(46,13,'Agree to your Car Rules',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 08:02:20','2019-08-08 09:45:23',NULL,NULL),(47,13,'Tell you their trip purpose',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 08:02:29','2019-09-02 04:51:02',NULL,NULL),(48,14,'Don\'t smoke while driving',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:20','2019-09-02 04:51:49',NULL,NULL),(49,14,'All Trunks Must Include Internal Release SystemTrunks Must Include Internal Release System',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:28','2019-08-09 06:52:27',NULL,NULL),(50,14,'Bans Winter Driving Without Proper Tires',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:35','2019-08-09 06:51:26',NULL,NULL),(51,14,'A seatbelt must be worn during every car trip',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:41','2019-08-09 06:50:28',NULL,NULL),(52,14,'Never share seatbelts',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:56','2019-09-02 04:51:33',NULL,NULL),(53,15,'Meet RentALL’s renter requirements',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:01:08','2019-08-10 09:40:40',NULL,NULL),(54,15,'Agree to your car rules',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:01:16','2019-08-08 06:02:44',NULL,NULL),(55,15,'Tell you their trip purpose',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:01:25','2017-01-18 11:01:25',NULL,NULL),(56,15,'Let you know how many people are coming on the trip',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:03:00','2018-05-02 04:57:56',NULL,NULL),(58,16,'1 day',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:43','2019-09-02 04:52:27',NULL,NULL),(59,16,'2 days',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:48','2017-01-18 15:19:48',NULL,NULL),(60,16,'3 days',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:58','2017-01-18 15:19:58',NULL,NULL),(61,16,'7 days',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:20:03','2017-01-18 15:20:03',NULL,NULL),(62,17,'Dates unavailable by default',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:01','2017-01-18 18:01:01',NULL,NULL),(63,17,'Any time',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:16','2017-01-18 18:01:16',NULL,NULL),(64,17,'3 months',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:22','2017-01-18 18:01:22',NULL,NULL),(65,17,'6 months',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:29','2017-01-18 18:01:29',NULL,NULL),(66,17,'1 year',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:42','2017-01-18 18:01:42',NULL,NULL),(67,18,'day min','days min',NULL,NULL,0,100,NULL,'1','2017-01-18 18:18:28','2019-08-19 11:47:28',NULL,NULL),(68,19,'day max','days max',NULL,NULL,0,100,NULL,'1','2017-01-18 18:19:00','2019-08-24 06:55:56',NULL,NULL),(73,10,'Defogger',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-28 11:36:34','2019-08-07 05:11:25',NULL,NULL),(74,1,'Sedan',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-28 14:21:14','2019-09-02 04:37:44',NULL,NULL),(76,1,'Convertible',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-30 04:24:13','2019-09-02 04:37:41',NULL,NULL),(77,1,'SUV',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-30 04:24:18','2019-09-02 04:37:39',NULL,NULL),(102,4,'2014',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-10 08:57:40','2019-08-23 07:58:42',NULL,NULL),(105,4,'2015',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-12 08:08:55','2019-08-23 07:58:38',NULL,NULL),(113,1,'Maruti ',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-24 02:28:41','2019-09-02 04:36:37',NULL,NULL),(118,10,'Airbags',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-24 02:33:13','2019-08-07 05:10:39',NULL,NULL),(119,10,'Reverse sensing system',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-24 02:33:23','2019-08-07 05:10:30',NULL,NULL),(126,4,'2016',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-28 04:49:12','2019-08-23 07:58:33',NULL,NULL),(128,16,'Same day',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-28 04:55:21','2018-04-30 21:33:25',NULL,NULL),(129,20,'Suzuki',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-06 10:07:17','2019-08-07 06:05:09',NULL,NULL),(130,20,'Toyota',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-06 10:07:53','2019-08-06 10:07:53',NULL,NULL),(131,3,'Skoda ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-06 10:08:47','2019-08-06 10:08:47',NULL,'129'),(132,3,'Maruti Swift',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-06 10:09:15','2019-08-07 05:05:31',NULL,'137'),(133,21,'50k - 25k Kilometre',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-06 10:21:52','2019-08-23 08:05:06',NULL,NULL),(134,21,'100k - 75k Kilometre',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-06 10:21:58','2019-08-23 08:05:01',NULL,NULL),(136,20,'Hatchback',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-06 10:54:54','2019-08-06 10:54:54',NULL,NULL),(137,20,'Maruti ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-07 05:03:27','2019-08-07 05:03:27',NULL,NULL),(143,3,'Innova crista',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-16 04:59:08','2019-08-16 04:59:08',NULL,'130'),(144,4,'2017',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-16 04:59:30','2019-08-23 07:58:29',NULL,NULL),(145,21,'150k - 125k Kilometre',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-16 04:59:47','2019-08-23 08:04:56',NULL,NULL),(146,1,'Hatchback',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:45:21','2019-09-02 04:37:36',NULL,NULL),(147,20,'Maruti Suzuki Swift',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:46:20','2019-08-23 07:46:20',NULL,NULL),(148,3,'Volkswagen Polo GTI (Upcoming), MINI Cooper S 3 Door',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:46:37','2019-08-23 07:46:37',NULL,'147'),(149,1,'Sedan',NULL,NULL,NULL,NULL,NULL,NULL,'0','2019-08-23 07:46:45','2019-09-02 04:38:38',NULL,NULL),(150,20,'Maruti Suzuki Ciaz',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:47:21','2019-08-23 07:47:21',NULL,NULL),(151,3,'Maruti Suzuki Ciaz',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:47:35','2019-08-23 07:47:35',NULL,'150'),(152,3,' Hyundai Elantra',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:47:40','2019-08-23 07:47:40',NULL,'150'),(153,1,'MPV',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:47:49','2019-09-02 04:37:28',NULL,NULL),(154,20,'Datsun GO+',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:47:58','2019-08-23 07:47:58',NULL,NULL),(155,3,'Maruti Suzuki Omni',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:48:19','2019-08-23 07:48:19',NULL,'154'),(156,3,'Maruti Suzuki Eeco',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:48:28','2019-08-23 07:48:28',NULL,'154'),(157,1,'SUV',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:48:39','2019-09-02 04:37:07',NULL,NULL),(158,20,'Land Rover Discovery Sport',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:48:51','2019-08-23 07:48:51',NULL,NULL),(159,3,'Honda CR-V',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:49:12','2019-08-23 07:49:12',NULL,'158'),(160,3,'Renault Duster',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:49:21','2019-08-23 07:49:21',NULL,'158'),(161,3,'Skoda Yeti',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:49:29','2019-08-23 07:49:29',NULL,'158'),(162,1,'Crossover',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:49:40','2019-09-02 04:37:25',NULL,NULL),(163,20,'Volvo S60 Cross Country',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:49:48','2019-08-23 07:49:48',NULL,NULL),(164,3,'Maruti Suzuki S-Cross',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:50:06','2019-08-23 07:50:06',NULL,'163'),(165,3,'Volvo S60 Cross Country',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:50:15','2019-08-23 07:50:15',NULL,'163'),(166,3,'Hyundai i20 Active',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:50:26','2019-08-23 07:50:26',NULL,'163'),(167,1,'Coupe',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:50:37','2019-09-02 04:37:23',NULL,NULL),(168,20,'Mercedes-Benz ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:50:49','2019-08-23 10:43:36',NULL,NULL),(169,3,'Ford Mustang',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:51:04','2019-08-23 07:51:04',NULL,'168'),(170,3,'Audi R8',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:51:14','2019-08-23 07:51:14',NULL,'168'),(171,3,' Mercedes-Benz GLE Coupe',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:51:23','2019-08-23 07:51:23',NULL,'168'),(172,20,'Audi A3 Cabriolet',NULL,NULL,NULL,NULL,NULL,NULL,'0','2019-08-23 07:51:46','2019-09-02 04:39:16',NULL,NULL),(173,3,'Mercedes-AMG SLC 43',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:52:06','2019-08-23 07:52:06',NULL,'172'),(174,3,'Audi A3 Cabriolet',NULL,NULL,NULL,NULL,NULL,NULL,'0','2019-08-23 07:52:14','2019-09-14 10:54:27',NULL,'172'),(175,4,'2018',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:55:58','2019-08-23 07:58:24',NULL,NULL),(176,4,'2019',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:56:27','2019-09-02 04:40:12',NULL,NULL),(177,21,'175k - 150k Kilometre',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 08:04:29','2019-08-23 08:04:51',NULL,NULL),(178,21,'200k+ Kilometre',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 08:04:43','2019-08-23 08:04:43',NULL,NULL),(179,1,'Mercedes-Benz ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 10:43:13','2019-09-02 04:37:20',NULL,NULL),(180,3,'Mercedes-Benz S-Class',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 10:43:45','2019-08-23 10:43:45',NULL,'168'),(181,20,'Jaguar',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 12:17:27','2019-08-23 12:17:31',NULL,NULL),(182,3,'Jaguar XJ',NULL,NULL,NULL,NULL,NULL,NULL,'0','2019-08-23 12:17:45','2019-09-16 09:56:19',NULL,'181'),(183,20,'Tesla ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 12:31:01','2019-08-23 12:31:01',NULL,NULL),(184,3,'Tesla Model s',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 12:31:10','2019-08-23 12:31:10',NULL,'183'),(185,20,'BMW ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 12:46:49','2019-08-23 12:46:49',NULL,NULL),(186,3,'BMW 7 Series',NULL,NULL,NULL,NULL,NULL,NULL,'0','2019-08-23 12:46:57','2019-09-16 09:55:16',NULL,'185'),(187,20,'Lexus ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 12:56:39','2019-08-23 12:56:39',NULL,NULL),(188,3,'Lexus LS',NULL,NULL,NULL,NULL,NULL,NULL,'0','2019-08-23 12:56:44','2019-09-16 09:54:15',NULL,'187');
/*!40000 ALTER TABLE `ListSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListSettingsTypes`
--

DROP TABLE IF EXISTS `ListSettingsTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListSettingsTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fieldType` enum('stringType','numberType') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'stringType',
  `step` int DEFAULT '1',
  `isEnable` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `typeLabel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isMultiValue` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListSettingsTypes`
--

LOCK TABLES `ListSettingsTypes` WRITE;
/*!40000 ALTER TABLE `ListSettingsTypes` DISABLE KEYS */;
INSERT INTO `ListSettingsTypes` VALUES (1,'carType','stringType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Car Type',0),(2,'personCapacity','numberType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Person Capacity',0),(3,'model','stringType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Model',0),(4,'year','stringType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Year',0),(5,'bedrooms','numberType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Bed Rooms',0),(6,'beds','numberType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Beds',0),(7,'bedType','stringType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Vehicle colors',0),(8,'bathrooms','numberType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Bathrooms',0),(9,'bathroomType','stringType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Bathroom Type',0),(10,'carFeatures','stringType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Car Features',1),(11,'safetyAmenities','stringType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Safety Amenities',1),(12,'spaces','stringType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Spaces',1),(13,'guestRequirements','stringType',3,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Renter Requirements',0),(14,'carRules','stringType',3,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Car Rules',1),(15,'reviewGuestBook','stringType',3,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Review How Renters Book',0),(16,'bookingNoticeTime','stringType',3,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Booking Notice Time',0),(17,'maxDaysNotice','stringType',3,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Maximum Days Notice',0),(18,'minNight','numberType',3,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Minimum Days',0),(19,'maxNight','numberType',3,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Maximum Days',0),(20,'make','stringType',1,'1','2019-08-06 09:21:54','2019-08-06 09:21:54','Make',0),(21,'odometer','stringType',1,'1','2019-08-06 09:21:54','2019-08-06 09:21:54','Odometer',0);
/*!40000 ALTER TABLE `ListSettingsTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListViews`
--

DROP TABLE IF EXISTS `ListViews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListViews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListViews`
--

LOCK TABLES `ListViews` WRITE;
/*!40000 ALTER TABLE `ListViews` DISABLE KEYS */;
INSERT INTO `ListViews` VALUES (1,6,'977bc550-5069-11e9-a14e-635e0fd3bfa6','2020-02-26 17:13:50','2020-02-26 17:13:50');
/*!40000 ALTER TABLE `ListViews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Listing`
--

DROP TABLE IF EXISTS `Listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Listing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roomType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `houseType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transmission` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bedrooms` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buildingSize` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bedType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `beds` int DEFAULT NULL,
  `personCapacity` int DEFAULT NULL,
  `bathrooms` float DEFAULT NULL,
  `bathroomType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buildingName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zipcode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lng` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isMapTouched` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `coverPhoto` int DEFAULT NULL,
  `bookingType` enum('request','instant') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'instant',
  `isPublished` tinyint(1) NOT NULL DEFAULT '0',
  `isReady` tinyint(1) NOT NULL DEFAULT '0',
  `reviewsCount` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Listing_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Listing`
--

LOCK TABLES `Listing` WRITE;
/*!40000 ALTER TABLE `Listing` DISABLE KEYS */;
INSERT INTO `Listing` VALUES (1,'977bc550-5069-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','1',NULL,NULL,1,1,1,NULL,'FR','Dépose Minute Terminal 1',NULL,'Seine-et-Marne','Île-de-France','95700','49.00828310407196','2.549126129638694',1,'2019-08-23 12:02:21','2022-12-22 14:00:00','Drive Symphony excellence of Audi A8','Design: The first of its kind, the A8 features new ASF aluminum construction whose amazing weight-saving technology allows for ultimate performance. It features LED headlamps and taillights, power soft-closing doors, a power trunk with hands-free release and a headlight washing system.\nremaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\nFeatures:  Its spacious, plush interior features a BOSE surround sound system, MMI navigation system with voice control and handwriting-recognition technology, rain and light sensor for automatic windshield and headlights, leather, heated and memory capable front seats.\nEasy Parking: With Audi\'s Advanced Parking System, you never have to worry about parallel parking or fitting into tight spots with your luxury car rental from Audi.All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',7,'request',1,1,0),(2,'977bc550-5069-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','1',NULL,NULL,1,1,1,NULL,'AE','8 Brentwood Road',NULL,'Chatham Township','NJ','07928','25.202364191897132','55.27241358308106',1,'2019-08-23 12:18:41','2022-12-22 14:00:00','Jaguar Recreates iconic JCB Stunt car','Jaguar is now a luxury vehicle brand of Jaguar Land Rover and was owned by the Indian company Tata Motors since 2008. With an impressive iconic style and the most cutting-edge technology, Jaguar is now the world’s most recognized premium car brands synonymous with luxury sports cars. Set out on your trip with a Jaguar car rental to enjoy a top quality yet affordable drive towards your ideal destination.\n\n',13,'instant',1,1,0),(3,'977bc550-5069-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','1',NULL,NULL,1,1,1,NULL,'PE','425 Avenida Antonio Miroquesada',NULL,'Provincia de Lima','Municipalidad Metropolitana de Lima','15076','-12.0953738','-77.0597327',1,'2019-08-23 12:31:41','2022-12-22 14:00:00','Model s Tasla is Latest update \'handover party\' ','The Ipsum Tesla Model S has been the flagship model for the brand and has been helping Tesla beat its competition such as the BMW 7-Series, Audi A8 and Mercedes-Benz S-Class in not only the United States but also in the European markets on several occasions. It is a long established fact that a reader will be distracted by the readable content. The electric sedan with the liftback design form is available in a choice of three variants- 75D, 100D, and the P100D Various versions have evolved over the years, sometimes by accident, sometimes on purpose.',17,'request',1,1,0),(4,'977bc550-5069-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','1',NULL,NULL,1,1,1,NULL,'ZA','25 Hill Street',NULL,'City of Johannesburg Metropolitan Municipality','GP','2194','-26.09437358383807','27.99047656289065',1,'2019-08-23 12:41:43','2022-12-22 14:00:00','Experience with Luxury Mercedes-Benz','Drive-in luxury wherever you go with a Mercedes-Benz rental car from SIXT. This famous German car brand is renowned for creating vehicles that are both high in quality and style. Combining precision engineering and high-end aesthetics,\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable sourceMercedes-Benz has become one of the top luxury car producers in the world. From the F-015 to the S-Class Cabriolet you can expect to enjoy a smooth ride in any Mercedes-Benz luxury car model as they all offer impressive comforts and capabilities. SIXT will ensure you a stress-free rental experience with excellent customer service and advice, attractive offers and a wide fleet of top quality rental cars.',NULL,'instant',1,1,0),(5,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','1',NULL,NULL,1,1,1,NULL,'FI','13 Mannerheimintie sam',NULL,'Helsinki','HS','00100','60.17342419999999','24.9340315',1,'2019-08-23 12:49:08','2022-12-22 14:00:00','2018 BMW 7 530HP V8 M Sport Exhaust Tech ','Audi is among the most recognized luxury car brand around the world. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. The German manufacturers have an unparalleled reputation for producing exquisite vehicles offering exceptional performance and comforts. Their sophisticated exteriors are aerodynamic and highlight the interplay of light and line. Audi models are equipped with the latest technologies and innovative features. Its no surprise that the brand has succeeded at world champion racing events like the Le Mans with their sports car models. Sixt is delighted to offer you the chance to experience the refinement and pleasures of an Audi car rental.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',27,'request',1,1,0),(6,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',NULL,NULL,'2','1',NULL,NULL,1,1,1,NULL,'PH','Russia',NULL,'Parañaque','NCR','1709','14.49017615899127','121.03435629242722',1,'2019-08-23 12:57:24','2022-12-22 14:00:00','Grass Burgesses of Lexus Sedan','Founded in 1983, Lexus is a global luxury car make owned by Japan\'s Toyota Motor group. It only took a decade for the brand to surpass sales volume of Mercedes-Benzes and BMW in North America. Be it a luxurious four-door sedan or a cool two-door hardtop sports car, each Lexus is sophisticated in design and meticulously constructed with incredible quality management to ensure you have the best driving experience.\nMany desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\nWith EasyRentCars you can enjoy the best customer service and delight in the experience of renting and driving a Lexus without needing to burn a hole in your pockets. Choose from premium cars, luxury sedans, SUVs and sports cars, enjoying all the advantages that EasyRentCars bring of these spectacular vehicles.',35,'instant',1,1,0);
/*!40000 ALTER TABLE `Listing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListingData`
--

DROP TABLE IF EXISTS `ListingData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListingData` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int DEFAULT NULL,
  `bookingNoticeTime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `checkInStart` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Flexible',
  `checkInEnd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Flexible',
  `minDay` int DEFAULT NULL,
  `maxDay` int DEFAULT NULL,
  `priceMode` tinyint(1) DEFAULT NULL,
  `basePrice` double DEFAULT NULL,
  `maxPrice` float DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hostingFrequency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weeklyDiscount` float DEFAULT '0',
  `monthlyDiscount` float DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `delivery` double DEFAULT NULL,
  `maxDaysNotice` enum('unavailable','3months','6months','9months','12months','available') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unavailable',
  `cancellationPolicy` int DEFAULT '1',
  `securityDeposit` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ListingData_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListingData`
--

LOCK TABLES `ListingData` WRITE;
/*!40000 ALTER TABLE `ListingData` DISABLE KEYS */;
INSERT INTO `ListingData` VALUES (1,1,'61','10','23',1,9,NULL,2500,NULL,'USD',NULL,4,8,'2019-08-23 12:14:50','2019-08-24 05:14:25',75,'available',3,0),(2,2,'60','13','16',0,16,NULL,1750,NULL,'USD',NULL,0,0,'2019-08-23 12:22:03','2019-08-24 05:14:17',125,'available',2,0),(3,3,'61','10','19',1,7,NULL,2500,NULL,'USD',NULL,10,25,'2019-08-23 12:35:49','2019-08-24 05:14:31',320,'available',3,0),(4,4,'60','10','18',2,0,NULL,3500,NULL,'USD',NULL,5,8,'2019-08-23 12:44:19','2019-08-24 05:14:00',125,'available',1,0),(5,5,'59','14','20',6,0,NULL,4500,NULL,'USD',NULL,15,35,'2019-08-23 12:52:03','2019-08-23 12:52:03',250,'12months',3,0),(6,6,'59','13','24',0,0,NULL,1500,NULL,'USD',NULL,0,0,'2019-08-23 13:04:28','2019-09-13 16:12:59',100,'9months',1,0);
/*!40000 ALTER TABLE `ListingData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentMethods`
--

DROP TABLE IF EXISTS `PaymentMethods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PaymentMethods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `processedIn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fees` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `paymentType` tinyint(1) DEFAULT '1',
  `paymentName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentMethods`
--

LOCK TABLES `PaymentMethods` WRITE;
/*!40000 ALTER TABLE `PaymentMethods` DISABLE KEYS */;
INSERT INTO `PaymentMethods` VALUES (1,'Paypal','3–4 hours','PayPal withdrawal fees','USD','Connect your existing PayPal account.',1,'2017-04-18 20:13:25','2017-04-18 20:13:25',1,'PayPal'),(2,'Bank Account','5–7 business days','No fees','EUR','Add your bank details',1,'2018-01-04 17:26:45','2018-01-04 17:26:45',2,'Stripe');
/*!40000 ALTER TABLE `PaymentMethods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentSettings`
--

DROP TABLE IF EXISTS `PaymentSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PaymentSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `paymentName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `paymentStatus` enum('true','false') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'false',
  `paymentMode` enum('live','sandbox') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'sandbox',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `APIUserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `APIPassword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `APISecret` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AppId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentSettings`
--

LOCK TABLES `PaymentSettings` WRITE;
/*!40000 ALTER TABLE `PaymentSettings` DISABLE KEYS */;
INSERT INTO `PaymentSettings` VALUES (1,'paypal','false','sandbox','admin@gmail.com','Hello User Id','Hello password','Hello Secret','Hello Id','2019-03-27 11:53:47','2017-02-24 11:29:31');
/*!40000 ALTER TABLE `PaymentSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payout`
--

DROP TABLE IF EXISTS `Payout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payout` (
  `id` int NOT NULL AUTO_INCREMENT,
  `methodId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payEmail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address1` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `address2` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipcode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `default` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `last4Digits` int DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Payout_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payout`
--

LOCK TABLES `Payout` WRITE;
/*!40000 ALTER TABLE `Payout` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PopularLocation`
--

DROP TABLE IF EXISTS `PopularLocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PopularLocation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `locationAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PopularLocation`
--

LOCK TABLES `PopularLocation` WRITE;
/*!40000 ALTER TABLE `PopularLocation` DISABLE KEYS */;
INSERT INTO `PopularLocation` VALUES (1,'Texas','198 Gambler Lane, Clarksburg, WV, USA','519192873f2fc585c84ba25fe6d80d92.jpeg',1,'2019-03-27 10:17:45','2019-08-07 12:28:15'),(2,'Oristano','Viale della Croce Rossa, 96, Palermo, Province of Palermo, Italy','c7697235886d6c345568e58fbc8e2734.jpeg',1,'2019-03-27 10:20:32','2019-08-10 09:12:07'),(3,'Basse-Normandie','46 rue Ernest-Renan, Paris, France','16d68863a62a85841898aeaa3bb1fdfe.jpeg',1,'2019-03-27 10:27:32','2019-08-06 12:45:11'),(4,'Fergus Falls','328 East Fir Avenue, Atwater, CA, USA','c150329784f7e83bc2355692517964ad.jpeg',1,'2019-03-27 10:28:56','2019-08-23 13:05:38'),(5,'Shiels','76 Russell Rd, Nottingham, UK','ace1ea00d0f2f376b93b4f1641803f0f.jpeg',1,'2019-03-27 10:30:17','2019-09-17 07:32:56'),(6,'YunYan ','Guizhou Province Architectural Design & Research Institute, Nanming, Guiyang, Guizhou, China','a40e22f3dd84688089d557cd895cfc41.jpeg',1,'2019-03-27 10:32:23','2019-08-23 13:05:53');
/*!40000 ALTER TABLE `PopularLocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Privileges`
--

DROP TABLE IF EXISTS `Privileges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Privileges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `privilege` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Privileges`
--

LOCK TABLES `Privileges` WRITE;
/*!40000 ALTER TABLE `Privileges` DISABLE KEYS */;
INSERT INTO `Privileges` VALUES (1,'Manage Site Settings','2021-08-26 07:39:31','2021-08-26 07:39:31'),(2,'Manage Users','2021-08-26 07:39:31','2021-08-26 07:39:31'),(3,'Manage Cars','2021-08-26 07:39:31','2021-08-26 07:39:31'),(4,'Manage Reservations','2021-08-26 07:39:31','2021-08-26 07:39:31'),(5,'Manage Reviews','2021-08-26 07:39:31','2021-08-26 07:39:31'),(6,'Manage Admin Reviews','2021-08-26 07:39:31','2021-08-26 07:39:31'),(7,'Manage Service Fee','2021-08-26 07:39:31','2021-08-26 07:39:31'),(8,'Manage Document Verification','2021-08-26 07:39:31','2021-08-26 07:39:31'),(9,'Manage Messages','2021-08-26 07:39:31','2021-08-26 07:39:31'),(10,'Manage Report','2021-08-26 07:39:31','2021-08-26 07:39:31'),(11,'Manage Payout','2021-08-26 07:39:31','2021-08-26 07:39:31'),(12,'Manage Payment Gateway','2021-08-26 07:39:31','2021-08-26 07:39:31'),(13,'Manage Currency','2021-08-26 07:39:31','2021-08-26 07:39:31'),(14,'Manage Search Settings','2021-08-26 07:39:31','2021-08-26 07:39:31'),(15,'Manage Home Page Settings','2021-08-26 07:39:31','2021-08-26 07:39:31'),(16,'Manage Why Become Owner Page','2021-08-26 07:39:31','2021-08-26 07:39:31'),(17,'Manage Car Settings','2021-08-26 07:39:31','2021-08-26 07:39:31'),(18,'Manage Content','2021-08-26 07:39:31','2021-08-26 07:39:31'),(19,'Manage Static Content','2021-08-26 07:39:31','2021-08-26 07:39:31'),(20,'Manage Security Deposit','2022-12-22 12:49:36','2022-12-22 12:49:36');
/*!40000 ALTER TABLE `Privileges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PrivilegesURL`
--

DROP TABLE IF EXISTS `PrivilegesURL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PrivilegesURL` (
  `id` int NOT NULL AUTO_INCREMENT,
  `privilegeId` int NOT NULL,
  `permittedUrls` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PrivilegesURL`
--

LOCK TABLES `PrivilegesURL` WRITE;
/*!40000 ALTER TABLE `PrivilegesURL` DISABLE KEYS */;
INSERT INTO `PrivilegesURL` VALUES (1,1,'/siteadmin/settings/site','2021-08-26 07:39:31','2021-08-26 07:39:31'),(2,2,'/siteadmin/users','2021-08-26 07:39:31','2021-08-26 07:39:31'),(3,2,'/siteadmin/users','2021-08-26 07:39:31','2021-08-26 07:39:31'),(4,2,'/siteadmin/profileView/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(5,3,'/become-a-owner/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(6,3,'/siteadmin/listings','2021-08-26 07:39:31','2021-08-26 07:39:31'),(7,4,'/siteadmin/viewreservation/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(8,4,'/siteadmin/reservations','2021-08-26 07:39:31','2021-08-26 07:39:31'),(9,5,'/siteadmin/user-reviews','2021-08-26 07:39:31','2021-08-26 07:39:31'),(10,5,'/siteadmin/management-reviews/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(11,6,'/siteadmin/reviews','2021-08-26 07:39:31','2021-08-26 07:39:31'),(12,6,'/siteadmin/edit-review/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(13,6,'/siteadmin/write-reviews','2021-08-26 07:39:31','2021-08-26 07:39:31'),(14,7,'/siteadmin/settings/servicefees','2021-08-26 07:39:31','2021-08-26 07:39:31'),(15,8,'/siteadmin/document','2021-08-26 07:39:31','2021-08-26 07:39:31'),(16,9,'/siteadmin/messages','2021-08-26 07:39:31','2021-08-26 07:39:31'),(17,10,'/siteadmin/reportUser','2021-08-26 07:39:31','2021-08-26 07:39:31'),(18,11,'/siteadmin/payout','2021-08-26 07:39:31','2021-08-26 07:39:31'),(19,11,'/siteadmin/failed-payout/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(20,11,'/siteadmin/viewpayout/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(21,12,'/siteadmin/payment-gateway-section','2021-08-26 07:39:31','2021-08-26 07:39:31'),(22,13,'/siteadmin/currency','2021-08-26 07:39:31','2021-08-26 07:39:31'),(23,14,'/siteadmin/settings/search','2021-08-26 07:39:31','2021-08-26 07:39:31'),(24,15,'/siteadmin/home/caption','2021-08-26 07:39:31','2021-08-26 07:39:31'),(25,15,'/siteadmin/home/banner','2021-08-26 07:39:31','2021-08-26 07:39:31'),(26,15,'/siteadmin/home/footer-block','2021-08-26 07:39:31','2021-08-26 07:39:31'),(27,15,'/siteadmin/popularlocation','2021-08-26 07:39:31','2021-08-26 07:39:31'),(28,15,'/siteadmin/popularlocation/add','2021-08-26 07:39:31','2021-08-26 07:39:31'),(29,15,'/siteadmin/edit/popularlocation/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(30,15,'/siteadmin/home/static-info-block','2021-08-26 07:39:31','2021-08-26 07:39:31'),(31,16,'/siteadmin/whyHost/Block1','2021-08-26 07:39:31','2021-08-26 07:39:31'),(32,16,'/siteadmin/whyHost/Block2','2021-08-26 07:39:31','2021-08-26 07:39:31'),(33,16,'/siteadmin/whyHost/Block3','2021-08-26 07:39:31','2021-08-26 07:39:31'),(34,16,'/siteadmin/whyHost/Block4','2021-08-26 07:39:31','2021-08-26 07:39:31'),(35,16,'/siteadmin/whyHost/Block5','2021-08-26 07:39:31','2021-08-26 07:39:31'),(36,16,'/siteadmin/whyHost/Block6','2021-08-26 07:39:31','2021-08-26 07:39:31'),(37,17,'/siteadmin/listsettings/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(38,18,'/siteadmin/content-management','2021-08-26 07:39:31','2021-08-26 07:39:31'),(39,18,'/siteadmin/page/add','2021-08-26 07:39:31','2021-08-26 07:39:31'),(40,18,'/siteadmin/edit/page/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(41,19,'/siteadmin/staticpage/management','2021-08-26 07:39:31','2021-08-26 07:39:31'),(42,19,'/siteadmin/edit/staticpage/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(43,9,'/message/','2022-07-12 05:46:37','2022-07-12 05:46:37'),(44,20,'/siteadmin/manage-security-deposit','2022-12-22 12:49:36','2022-12-22 12:49:36');
/*!40000 ALTER TABLE `PrivilegesURL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recommend`
--

DROP TABLE IF EXISTS `Recommend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Recommend` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recommend`
--

LOCK TABLES `Recommend` WRITE;
/*!40000 ALTER TABLE `Recommend` DISABLE KEYS */;
INSERT INTO `Recommend` VALUES (1,5,'2019-08-23 13:07:25','2019-08-23 13:07:25'),(2,6,'2019-08-23 13:07:26','2019-08-23 13:07:26'),(3,4,'2019-08-23 13:07:26','2019-08-23 13:07:26'),(4,3,'2019-08-23 13:07:28','2019-08-23 13:07:28'),(5,2,'2019-08-23 13:07:29','2019-08-23 13:07:29'),(6,1,'2019-08-23 13:07:29','2019-08-23 13:07:29');
/*!40000 ALTER TABLE `Recommend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReportUser`
--

DROP TABLE IF EXISTS `ReportUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReportUser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reporterId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `reportType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReportUser`
--

LOCK TABLES `ReportUser` WRITE;
/*!40000 ALTER TABLE `ReportUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReportUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reservation`
--

DROP TABLE IF EXISTS `Reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `hostId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guestId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checkIn` datetime NOT NULL,
  `checkOut` datetime NOT NULL,
  `guests` int DEFAULT '1',
  `message` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `basePrice` float NOT NULL,
  `delivery` float DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` float DEFAULT NULL,
  `discountType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guestServiceFee` float DEFAULT NULL,
  `hostServiceFee` float DEFAULT NULL,
  `total` float NOT NULL,
  `confirmationCode` int DEFAULT NULL,
  `paymentState` enum('pending','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `payoutId` int DEFAULT NULL,
  `reservationState` enum('pending','approved','declined','completed','cancelled','expired') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `paymentMethodId` tinyint(1) DEFAULT NULL,
  `cancellationPolicy` int DEFAULT NULL,
  `isSpecialPriceAverage` float DEFAULT NULL,
  `dayDifference` float DEFAULT NULL,
  `startTime` float DEFAULT NULL,
  `endTime` float DEFAULT NULL,
  `licenseNumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `middleName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateOfBirth` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `countryCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentIntentId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isHold` tinyint(1) NOT NULL DEFAULT '0',
  `paymentAttempt` int NOT NULL DEFAULT '0',
  `securityDeposit` float NOT NULL DEFAULT '0',
  `claimStatus` enum('pending','approved','requested','fullyRefunded') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `claimAmount` float NOT NULL DEFAULT '0',
  `claimPayout` float NOT NULL DEFAULT '0',
  `claimRefund` float NOT NULL DEFAULT '0',
  `claimReason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isClaimCancelStatus` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reservation`
--

LOCK TABLES `Reservation` WRITE;
/*!40000 ALTER TABLE `Reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReservationSpecialPricing`
--

DROP TABLE IF EXISTS `ReservationSpecialPricing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReservationSpecialPricing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int DEFAULT NULL,
  `reservationId` int DEFAULT NULL,
  `blockedDates` datetime NOT NULL,
  `isSpecialPrice` float DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReservationSpecialPricing`
--

LOCK TABLES `ReservationSpecialPricing` WRITE;
/*!40000 ALTER TABLE `ReservationSpecialPricing` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReservationSpecialPricing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reviews`
--

DROP TABLE IF EXISTS `Reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `listId` int NOT NULL,
  `authorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `reviewContent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rating` float NOT NULL,
  `privateFeedback` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `parentId` int DEFAULT '0',
  `automated` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `isAdminEnable` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Reviews_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reviews`
--

LOCK TABLES `Reviews` WRITE;
/*!40000 ALTER TABLE `Reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SearchSettings`
--

DROP TABLE IF EXISTS `SearchSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SearchSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `minPrice` float NOT NULL,
  `maxPrice` float NOT NULL,
  `PriceRangecurrency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SearchSettings`
--

LOCK TABLES `SearchSettings` WRITE;
/*!40000 ALTER TABLE `SearchSettings` DISABLE KEYS */;
INSERT INTO `SearchSettings` VALUES (1,10,10000,'USD','2019-03-27 11:53:47','2019-09-16 04:33:40');
/*!40000 ALTER TABLE `SearchSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `SequelizeMeta_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20180804061511-addUserBanStatus.js'),('20180804062523-addIsReadColumnInThreads.js'),('20180809095644-createBedTypeTable.js'),('20180919114144-addBanUserDefault.js'),('20180924105437-updateUserLoginTable.js'),('20180924130941-addNewUserLoginTable.js'),('20180929101729-updateNulledBanUserStatus.js'),('20180929110523-addColumnsForSmsVerification.js'),('20180929112313-updateCountyListWithDialCodes.js'),('20190105123130-addHomePageTypeSiteSettings.js'),('20190202071052-addIsListActiveField.js'),('20190202103305-updatePaymentMethods.js'),('20190206111430-createReportUser.js'),('20190223073145-addIsDeleteAtField.js'),('20190225042333-addReviewsCountInListing.js'),('20190322050510-addSiteSettingsField.js'),('20190325035946-addListBlockedDates.js'),('20190429092459-addColumNewThread.js'),('20190430110742-changeListingDataCloum.js'),('20190503052141-addColumnItemDescriptionListSettingsTable.js'),('20190513044345-addMetaFields.js'),('20190513070310-insertStaticpage.js'),('20190514121558-addCancellationPolicyReservation.js'),('20190525050311-changeDataTypeForItemDescription.js'),('20190527125405-addIsAdminEnableReviews.js'),('20190531062204-addReservationSpecialPricing.js'),('20190603083234-modifyBlogAndStaticPage.js'),('20190603102231-deleteInboxItem.js'),('20190604051522-addReservationFields.js'),('20190607044315-changeListSettings.js'),('20190607094422-addListingTypes.js'),('20190607112310-addListSetting.js'),('20190610100457-changeListing.js'),('20190611070958-changeListingFields.js'),('20190614110520-addPhoneStatus.js'),('20190615092318-addCountryNameInUserProfile.js'),('20190622051622-changeColumnLocationUserProfile.js'),('20190701041011-changeColumnTypeInSiteSettingsValue.js'),('20190701065456-updateColumnNameInListSettingsTable.js'),('20190701091311-updateColumnForBecomeAHostColumnValues.js'),('20190712094239-deleteCoverPhotoRecordsFromListingTable.js'),('20190805111323-addTimeFields.js'),('20190807083025-changeTextInListSettings.js'),('20190809065537-updateTextReeviewRenterBook.js'),('20190809084848-createReservationFields.js'),('20190813055213-UpdateTextInListSettingTypes.js'),('20190814055241-changeNightFieldToday.js'),('20190819101022-changeTextForNightAdminSide.js'),('20190820043310-addTimeFieldsThreadItems.js'),('20190914094440-DropTableStaticPage.js'),('20190914094443-InsertStaticContentData.js'),('20200206113038-addPaymentIntentIdToReservation.js'),('20200214090746-addHomeLogoWidthAndHeightAtSiteSettings.js'),('20200217052735-addIsVerifiedToPayoutTable.js'),('20200227041812-addIsVerifiedToPayoutTable.js'),('20200318093354-addImageColumnAtBanner.js'),('20200318132644-addStaticBlockInfo.js'),('20200323045106-appAvailableStatus.js'),('20200324090446-contactPageManage.js'),('20200324140549-addWhyHostInfoBlockss.js'),('20200325121758-addHelpStaticContent.js'),('20200328053102-changeStaticPageCharacterSet.js'),('20200410134737-changeColumnValueAtWhyHostInfoBlock.js'),('20200421150200-changeColumnAtStaticInfoBlock.js'),('20200622131909-addColumnsinReservationTable.js'),('20200701045757-addPaymentNameColumnInPaymentMethods.js'),('20200701050534-addValuesForPaymentName.js'),('20200707112614-updateCancellationContent.js'),('20200713131816-renamePayPalValueInPaypal.js'),('20210419132836-addStripeKey.js'),('20210517131000-changePayoutCurrency.js'),('20210630081331-updatePaymentMethodColumnData.js'),('20210813082455-addRoleId.js'),('20210817161853-addPrivileges.js'),('20210817161858-addPrivilegesURL.js'),('20211028092138-addURL.js'),('20220324171651-changeCountry.js'),('20220608085726-deleteUser.js'),('20220701103002-veriicationUpdatedAt.js'),('20220816060417-addingSecurityDepositInListingData.js'),('20220816071040-addingSecurityDepositInReservation.js'),('20220819054554-addingSecurityDepositThreadItems.js'),('20220820061554-addingSecurityDepositPrivileges.js'),('20220906100106-changePriceType.js'),('20220906104530-changePricingType.js'),('20220915054259-addingClaimRefundInTransaction.js'),('20221025041250-createSiteSettings.js'),('20221214065613-addClaimstatus.js'),('20230421065642-addPlatformKey.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ServiceFees`
--

DROP TABLE IF EXISTS `ServiceFees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ServiceFees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `guestType` enum('fixed','percentage') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guestValue` float NOT NULL,
  `hostType` enum('fixed','percentage') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hostValue` float NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ServiceFees`
--

LOCK TABLES `ServiceFees` WRITE;
/*!40000 ALTER TABLE `ServiceFees` DISABLE KEYS */;
INSERT INTO `ServiceFees` VALUES (1,'percentage',7,'percentage',3,'USD','2019-09-05 18:44:00','2019-09-05 18:44:00');
/*!40000 ALTER TABLE `ServiceFees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SiteSettings`
--

DROP TABLE IF EXISTS `SiteSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SiteSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SiteSettings`
--

LOCK TABLES `SiteSettings` WRITE;
/*!40000 ALTER TABLE `SiteSettings` DISABLE KEYS */;
INSERT INTO `SiteSettings` VALUES (1,'Site Name','siteName','Your Site','site_settings','2019-03-27 11:53:47','2022-12-22 14:05:45'),(2,'Site Title','siteTitle','Your Site Title','site_settings','2019-03-27 11:53:47','2022-12-22 14:05:53'),(3,'Meta Keyword','metaKeyword','Your Site Meta Keyword','site_settings','2019-03-27 11:53:47','2022-12-22 14:06:13'),(4,'Meta Discription','metaDescription','Your Site Meta Description','site_settings','2019-03-27 11:53:47','2022-12-22 14:05:54'),(10,'Facebook Link','facebookLink','https://www.facebook.com/yoursite/','site_settings','2019-03-27 11:53:47','2022-12-22 14:05:57'),(11,'Twitter Link','twitterLink','https://twitter.com/yoursite','site_settings','2019-03-27 11:53:47','2022-12-22 14:05:58'),(12,'Instagram Link','instagramLink','https://www.instagram.com/?hl=en','site_settings','2019-03-27 11:53:47','2022-12-22 14:06:00'),(64,'Logo Height','logoHeight','63','site_settings','2019-03-27 11:53:47','2022-12-22 14:05:46'),(65,'Logo Width','logoWidth','105','site_settings','2019-03-27 11:53:47','2022-12-22 14:05:47'),(66,'Home Page Banner Layout','homePageType','3','site_settings','2019-03-27 11:53:47','2022-12-22 14:06:01'),(67,'Video URL','videoLink','https://www.youtube.com/watch?v=5y2P4z7DM88','site_settings','2019-08-06 09:20:42','2022-12-22 14:06:02'),(68,'Phone Number Status','phoneNumberStatus','1','site_settings','2019-08-06 09:21:54','2022-12-22 14:06:02'),(74,'Logo','Logo','fbc238187d0843e2713500e81fe88e2b.png','site_settings','2019-09-16 17:37:59','2022-12-22 14:05:55'),(75,'Home Page Logo Height','homePageLogoHeight','63','site_settings','2020-02-26 16:58:46','2022-12-22 14:05:50'),(76,'Home Page Logo Width','homePageLogoWidth','105','site_settings','2020-02-26 16:58:46','2022-12-22 14:05:52'),(77,'Home Page Logo','homePageLogo','06e5bdfea17c4c07253df0bdd8ee565e.png','site_settings','2020-02-26 17:18:32','2020-02-26 17:18:32'),(78,'App Available Status','appAvailableStatus','1','site_settings','2020-04-21 13:55:00','2022-12-22 14:06:04'),(79,'PlayStore URL','playStoreUrl','https://play.google.com/store?hl=en','site_settings','2020-04-21 13:55:00','2022-12-22 14:06:05'),(80,'AppStore URL','appStoreUrl','https://www.apple.com/ios/app-store/','site_settings','2020-04-21 13:55:00','2022-12-22 14:06:06'),(81,'email','email','support@yoursite.com','site_settings','2020-04-21 13:55:00','2022-12-22 14:06:07'),(82,'Phone Number','phoneNumber','000000000','site_settings','2020-04-21 13:55:00','2022-12-22 14:06:10'),(83,'Address','address','Location, State, Country','site_settings','2020-04-21 13:55:00','2022-12-22 14:06:11'),(84,'Stripe Publishable Key','stripePublishableKey','pk_test_C5ukBJM7qr5P1F8dY4XKhdyp','site_settings','2021-08-12 13:37:43','2022-12-22 14:06:14'),(86,'Favicon Logo','faviconLogo','3f4137096411c286ebcafcddfb9d7100.png','site_settings','2022-12-22 12:49:55','2022-12-22 14:05:12'),(87,'Email Logo','emailLogo','8ffad7fcec2b14df5f94d2b8ce6d1039.png','site_settings','2022-12-22 14:05:31','2022-12-22 14:05:31'),(88,'Platform secret key','platformSecretKey','JjQI:gHf+^=D','secret_settings','2023-05-11 11:27:37','2023-05-11 11:27:37');
/*!40000 ALTER TABLE `SiteSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StaticInfoBlock`
--

DROP TABLE IF EXISTS `StaticInfoBlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StaticInfoBlock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StaticInfoBlock`
--

LOCK TABLES `StaticInfoBlock` WRITE;
/*!40000 ALTER TABLE `StaticInfoBlock` DISABLE KEYS */;
INSERT INTO `StaticInfoBlock` VALUES (1,'CarCounterTitle1','carCounterTitle1','Contrary to popular belief','2020-04-21 13:54:58','2020-04-21 14:53:08'),(2,'CarCounterContent1','carCounterContent1','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.','2020-04-21 13:54:58','2020-04-21 14:53:08'),(3,'CarCounterTitle2','carCounterTitle2','Contrary to popular belief','2020-04-21 13:54:58','2020-04-21 14:53:08'),(4,'CarCounterImage1','carCounterImage1','42009e0de0a73802cf07f2dfcd5b0830.png','2020-04-21 13:54:58','2020-04-21 14:29:30'),(5,'CarBlockTitle1','carBlockTitle1','Lorem Ipsum is simply dummy text','2020-04-21 13:54:58','2020-04-21 14:53:08'),(6,'CarBlockTitle2','carBlockTitle2','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.','2020-04-21 13:54:58','2020-04-21 14:53:09'),(7,'CarCounterContent2','carCounterContent2','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.','2020-04-21 13:54:58','2020-04-21 14:53:08'),(8,'CarCounterTitle3','carCounterTitle3','Lorem Ipsum is simply dummy text','2020-04-21 13:54:58','2020-04-21 14:53:08'),(9,'CarBlockContent1','carBlockContent1','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.','2020-04-21 13:54:58','2020-04-21 14:53:09'),(10,'CarBlockImage1','carBlockImage1','51c2e3696949677f552c7f7d601afa43.jpeg','2020-04-21 13:54:58','2020-04-21 14:35:06'),(11,'CarTripTitle1','carTripTitle1','There are many variations of passages of Lorem Ipsum','2020-04-21 13:54:58','2020-04-21 14:53:09'),(12,'CarTripContent1','carTripContent1','But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system','2020-04-21 13:54:58','2020-04-21 14:53:09'),(13,'CarTripTitle2','carTripTitle2','Sed ut perspiciatis unde omnis iste natus','2020-04-21 13:54:58','2020-04-21 14:53:09'),(14,'CarTripContent2','carTripContent2','But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system','2020-04-21 13:54:58','2020-04-21 14:53:09'),(15,'CarTripTitle3','carTripTitle3','Sed ut perspiciatis unde omnis iste natus','2020-04-21 13:54:58','2020-04-21 14:53:09'),(16,'CarTripContent3','carTripContent3','But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system','2020-04-21 13:54:58','2020-04-21 14:53:10'),(17,'CarTripImage1','carTripImage1','b0373f7539808f53457805edb31bd4ee.jpeg','2020-04-21 13:54:58','2020-04-21 14:38:40'),(18,'CarTripImage2','carTripImage2','21136a644d41d23d23790fc1d6720e44.jpeg','2020-04-21 13:54:58','2020-04-21 14:48:28');
/*!40000 ALTER TABLE `StaticInfoBlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StaticPage`
--

DROP TABLE IF EXISTS `StaticPage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StaticPage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pageName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaDescription` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StaticPage`
--

LOCK TABLES `StaticPage` WRITE;
/*!40000 ALTER TABLE `StaticPage` DISABLE KEYS */;
INSERT INTO `StaticPage` VALUES (1,'About Us','<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.</p>','About Us','About Us','2019-09-14 10:25:58','2019-09-16 09:53:17'),(2,'Trust & Safety','<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>','Trust & Safety','Trust & Safety','2019-09-14 10:25:58','2019-09-14 10:35:47'),(3,'Travel Credit','<p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>','Travel Credit','Travel Credit','2019-09-14 10:25:58','2019-09-14 10:36:10'),(4,'Terms & Privacy','<p>Privacy Policy</p><p>This Privacy Policy describes how your personal information is collected, used, and shared when you use our &lt;YOUR_SITE&gt; Cars application.</p><p>RadicalStart InfoLab Private Limited built the &lt;YOUR_SITE&gt; Cars app as a Free app. This SERVICE is provided by RadicalStart InfoLab Private Limited at no cost and is intended for use as it is.</p><p>This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.</p><p>If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</p><p>Information Collection and Use</p><p>For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including email address, profile picture and first name. The information that we request will be retained by us and used as described in this privacy policy.</p><p>This app collects the user’s identifiable information such as email address, first name and profile picture from the third party social websites when the user tries to register an account with third party social websites such as “Google” and “Facebook”.</p><p>We don\'t share your information with any third-party services.</p><p>Log Data</p><p>We want to inform you that whenever you use our Service, in case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.</p><p>Cookies</p><p>Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device\'s internal memory.</p><p>This Service does not use these “cookies” explicitly. However, the app may use a third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.</p><p>Security</p><p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p><p>Changes to This Privacy Policy</p><p>We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.</p><p>&nbsp;</p><p>Contact Us</p><p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at support@yoursite.com.</p>','Terms & Privacy','Terms & Privacy','2019-09-14 10:25:58','2021-08-12 16:07:30'),(5,'Help','<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>','Help','Help','2020-04-21 13:55:01','2020-04-21 15:08:21');
/*!40000 ALTER TABLE `StaticPage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ThreadItems`
--

DROP TABLE IF EXISTS `ThreadItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ThreadItems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `threadId` int NOT NULL,
  `sentBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `isRead` tinyint(1) DEFAULT NULL,
  `type` enum('message','inquiry','preApproved','declined','approved','pending','cancelledByHost','cancelledByGuest','intantBooking','requestToBook','confirmed','expired','completed','claimRequested','claimRefunded') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'message',
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `personCapacity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `reservationId` int DEFAULT NULL,
  `startTime` float DEFAULT NULL,
  `endTime` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `threadId` (`threadId`),
  CONSTRAINT `ThreadItems_ibfk_1` FOREIGN KEY (`threadId`) REFERENCES `Threads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ThreadItems`
--

LOCK TABLES `ThreadItems` WRITE;
/*!40000 ALTER TABLE `ThreadItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `ThreadItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Threads`
--

DROP TABLE IF EXISTS `Threads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Threads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `host` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guest` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isRead` tinyint(1) DEFAULT NULL,
  `messageUpdatedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `Threads_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Threads`
--

LOCK TABLES `Threads` WRITE;
/*!40000 ALTER TABLE `Threads` DISABLE KEYS */;
/*!40000 ALTER TABLE `Threads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Transaction`
--

DROP TABLE IF EXISTS `Transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `payerEmail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payerId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiverEmail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiverId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transactionId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `total` float NOT NULL,
  `transactionFee` float DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ipn_track_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentType` enum('booking','cancellation','host','claimRefund') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'booking',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `paymentMethodId` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `Transaction_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transaction`
--

LOCK TABLES `Transaction` WRITE;
/*!40000 ALTER TABLE `Transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `Transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TransactionHistory`
--

DROP TABLE IF EXISTS `TransactionHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TransactionHistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payoutId` int NOT NULL,
  `payoutEmail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` float NOT NULL,
  `fees` float DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `transactionId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentMethodId` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `TransactionHistory_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TransactionHistory`
--

LOCK TABLES `TransactionHistory` WRITE;
/*!40000 ALTER TABLE `TransactionHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `TransactionHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailConfirmed` tinyint(1) DEFAULT '0',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userBanStatus` tinyint(1) DEFAULT '0',
  `userDeletedAt` datetime DEFAULT NULL,
  `userDeletedBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('977bc550-5069-11e9-a14e-635e0fd3bfa6','qa@radicalstart.com','$2a$08$lqcmo6OgjVbcioD1uDAlueCdu6JYBwZe2xaoc1dEparRYKDjFrv9y',1,'email','2019-03-27 08:23:25','2019-03-27 08:23:25',0,NULL,NULL),('d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6','demo@radicalstart.com','$2a$08$jkiXGz2lM41L47LdWFTBZuLhwT3dTLDK3Nmhjx6PrRydp0DEEb9gG',1,'email','2019-03-27 07:49:15','2019-03-27 07:49:15',0,NULL,NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAmenities`
--

DROP TABLE IF EXISTS `UserAmenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserAmenities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `amenitiesId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserAmenities_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=516 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAmenities`
--

LOCK TABLES `UserAmenities` WRITE;
/*!40000 ALTER TABLE `UserAmenities` DISABLE KEYS */;
INSERT INTO `UserAmenities` VALUES (1,1,27,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(2,1,119,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(3,1,26,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(4,1,25,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(5,2,26,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(6,2,119,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(7,2,73,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(8,2,25,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(9,2,118,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(13,4,28,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(14,4,26,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(15,4,25,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(16,4,119,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(476,3,28,'2019-09-13 04:30:10','2019-09-13 04:30:10'),(477,3,25,'2019-09-13 04:30:10','2019-09-13 04:30:10'),(478,3,119,'2019-09-13 04:30:10','2019-09-13 04:30:10'),(515,5,25,'2019-09-14 05:43:42','2019-09-14 05:43:42');
/*!40000 ALTER TABLE `UserAmenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserClaim`
--

DROP TABLE IF EXISTS `UserClaim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserClaim` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserClaim_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserClaim`
--

LOCK TABLES `UserClaim` WRITE;
/*!40000 ALTER TABLE `UserClaim` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserClaim` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserHouseRules`
--

DROP TABLE IF EXISTS `UserHouseRules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserHouseRules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `houseRulesId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `houseRulesId` (`houseRulesId`),
  CONSTRAINT `UserHouseRules_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserHouseRules_ibfk_2` FOREIGN KEY (`houseRulesId`) REFERENCES `ListSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=249 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserHouseRules`
--

LOCK TABLES `UserHouseRules` WRITE;
/*!40000 ALTER TABLE `UserHouseRules` DISABLE KEYS */;
INSERT INTO `UserHouseRules` VALUES (9,5,'2019-08-23 12:52:03','2019-08-23 12:52:03',48),(10,5,'2019-08-23 12:52:03','2019-08-23 12:52:03',51),(11,5,'2019-08-23 12:52:03','2019-08-23 12:52:03',49),(20,4,'2019-08-24 05:14:00','2019-08-24 05:14:00',48),(21,4,'2019-08-24 05:14:00','2019-08-24 05:14:00',51),(22,4,'2019-08-24 05:14:00','2019-08-24 05:14:00',50),(25,2,'2019-08-24 05:14:17','2019-08-24 05:14:17',49),(26,1,'2019-08-24 05:14:25','2019-08-24 05:14:25',50),(27,1,'2019-08-24 05:14:25','2019-08-24 05:14:25',51),(28,3,'2019-08-24 05:14:31','2019-08-24 05:14:31',50),(29,3,'2019-08-24 05:14:31','2019-08-24 05:14:31',49),(246,6,'2019-09-13 16:12:59','2019-09-13 16:12:59',49),(247,6,'2019-09-13 16:12:59','2019-09-13 16:12:59',52),(248,6,'2019-09-13 16:12:59','2019-09-13 16:12:59',50);
/*!40000 ALTER TABLE `UserHouseRules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserListingData`
--

DROP TABLE IF EXISTS `UserListingData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserListingData` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `settingsId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserListingData_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=771 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserListingData`
--

LOCK TABLES `UserListingData` WRITE;
/*!40000 ALTER TABLE `UserListingData` DISABLE KEYS */;
INSERT INTO `UserListingData` VALUES (6,1,162,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(7,1,5,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(8,1,10,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(9,1,136,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(10,1,177,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(16,2,149,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(17,2,182,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(18,2,144,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(19,2,181,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(20,2,178,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(36,4,167,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(37,4,180,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(38,4,10,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(39,4,168,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(40,4,133,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(641,3,162,'2019-09-13 04:30:10','2019-09-13 04:30:10'),(642,3,184,'2019-09-13 04:30:10','2019-09-13 04:30:10'),(643,3,10,'2019-09-13 04:30:10','2019-09-13 04:30:10'),(644,3,183,'2019-09-13 04:30:10','2019-09-13 04:30:10'),(645,3,178,'2019-09-13 04:30:10','2019-09-13 04:30:10'),(721,5,162,'2019-09-14 05:43:42','2019-09-14 05:43:42'),(722,5,5,'2019-09-14 05:43:42','2019-09-14 05:43:42'),(723,5,10,'2019-09-14 05:43:42','2019-09-14 05:43:42'),(724,5,136,'2019-09-14 05:43:42','2019-09-14 05:43:42'),(725,5,133,'2019-09-14 05:43:42','2019-09-14 05:43:42'),(766,6,149,'2019-09-14 10:34:07','2019-09-14 10:34:07'),(767,6,188,'2019-09-14 10:34:07','2019-09-14 10:34:07'),(768,6,175,'2019-09-14 10:34:07','2019-09-14 10:34:07'),(769,6,187,'2019-09-14 10:34:07','2019-09-14 10:34:07'),(770,6,177,'2019-09-14 10:34:07','2019-09-14 10:34:07');
/*!40000 ALTER TABLE `UserListingData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserListingSteps`
--

DROP TABLE IF EXISTS `UserListingSteps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserListingSteps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `step1` enum('inactive','active','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `step2` enum('inactive','active','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `step3` enum('inactive','active','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserListingSteps_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserListingSteps`
--

LOCK TABLES `UserListingSteps` WRITE;
/*!40000 ALTER TABLE `UserListingSteps` DISABLE KEYS */;
INSERT INTO `UserListingSteps` VALUES (1,1,'completed','completed','completed','2019-08-23 12:02:21','2019-08-23 12:14:50'),(2,2,'completed','completed','completed','2019-08-23 12:18:41','2019-08-23 12:22:03'),(3,3,'completed','completed','completed','2019-08-23 12:31:41','2019-08-23 12:35:49'),(4,4,'completed','completed','completed','2019-08-23 12:41:44','2019-08-23 12:44:19'),(5,5,'completed','completed','completed','2019-08-23 12:49:08','2019-08-23 12:52:03'),(6,6,'completed','completed','completed','2019-08-23 12:57:24','2019-08-23 13:04:28');
/*!40000 ALTER TABLE `UserListingSteps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserLogin`
--

DROP TABLE IF EXISTS `UserLogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserLogin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deviceType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deviceId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deviceDetail` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserLogin`
--

LOCK TABLES `UserLogin` WRITE;
/*!40000 ALTER TABLE `UserLogin` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserLogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserProfile`
--

DROP TABLE IF EXISTS `UserProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserProfile` (
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `profileId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `displayName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateOfBirth` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phoneNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferredLanguage` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferredCurrency` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `info` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `location` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `stripeCusId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` int DEFAULT NULL,
  `verificationCode` int DEFAULT NULL,
  `countryCode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `countryName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codeUpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `profileId` (`profileId`),
  UNIQUE KEY `UserProfile_profileId_unique` (`profileId`),
  CONSTRAINT `UserProfile_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserProfile`
--

LOCK TABLES `UserProfile` WRITE;
/*!40000 ALTER TABLE `UserProfile` DISABLE KEYS */;
INSERT INTO `UserProfile` VALUES ('977bc550-5069-11e9-a14e-635e0fd3bfa6',2,'Radical','QA','Radical QA','1-2000-1','47b183fc3b5f918e007dea359dfcf3a7.jpeg','Female',NULL,'en','EUR','I always wanted to be a great writer, like Victor Hugo who wrote \"Les Miserable\", or like Roman Roland who wrote \"John Christopher\". They have influenced millions of people through their books. I also wanted to be a great psychologist, like William James or Sigmund Freud, who could read people’s mind. Of course, I am nowhere close to these people, yet. I am just someone who does some teaching, some research, and some writing. But my dream is still alive.','Lives in The City, United Kingdom','2019-03-27 08:23:25','2020-04-21 15:12:40',NULL,NULL,NULL,NULL,NULL,NULL),('d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',1,'Demo','User','Demo User','10-1994-5','0079fd330f0ff0eda9dfd043052ef6f2.jpeg','Male',NULL,'en','USD','I am a person who is positive about every aspect of life. There are many things I like to do, to see, and to experience. I like to read, I like to write; I like to think, I like to dream; I like to talk, I like to listen. I like to see the sunrise in the morning, I like to see the moonlight at night; I like to feel the music flowing on my face, I like to smell the wind coming from the ocean. I like to look at the clouds in the sky with a blank mind, I like to do thought experiment when I cannot sleep in the middle of the night. I like flowers in spring, rain in summer, leaves in autumn, and snow in winter. I like to sleep early, I like to get up late; I like to be alone, I like to be surrounded by people. I like country’s peace, I like metropolis’ noise; I like the beautiful west lake in Hangzhou, I like the flat cornfield in Campaign. I like delicious food and comfortable shoes; I like good books and romantic movies. I like the land and the nature, I like people. And, I like to laugh.','Architect based in Los Angeles,  CA.','2019-03-27 07:49:16','2019-08-23 12:46:02',NULL,NULL,NULL,'+91',NULL,NULL);
/*!40000 ALTER TABLE `UserProfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserSafetyAmenities`
--

DROP TABLE IF EXISTS `UserSafetyAmenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserSafetyAmenities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `safetyAmenitiesId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserSafetyAmenities_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserSafetyAmenities`
--

LOCK TABLES `UserSafetyAmenities` WRITE;
/*!40000 ALTER TABLE `UserSafetyAmenities` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserSafetyAmenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserSpaces`
--

DROP TABLE IF EXISTS `UserSpaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserSpaces` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `spacesId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `spacesId` (`spacesId`),
  CONSTRAINT `UserSpaces_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserSpaces_ibfk_2` FOREIGN KEY (`spacesId`) REFERENCES `ListSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserSpaces`
--

LOCK TABLES `UserSpaces` WRITE;
/*!40000 ALTER TABLE `UserSpaces` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserSpaces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserVerifiedInfo`
--

DROP TABLE IF EXISTS `UserVerifiedInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserVerifiedInfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEmailConfirmed` tinyint(1) DEFAULT '0',
  `isFacebookConnected` tinyint(1) DEFAULT '0',
  `isGoogleConnected` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isIdVerification` tinyint(1) DEFAULT '0',
  `isPhoneVerified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserVerifiedInfo_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserVerifiedInfo`
--

LOCK TABLES `UserVerifiedInfo` WRITE;
/*!40000 ALTER TABLE `UserVerifiedInfo` DISABLE KEYS */;
INSERT INTO `UserVerifiedInfo` VALUES (1,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',1,0,1,'2019-03-27 07:49:16','2019-09-12 04:48:18',0,0),(2,'977bc550-5069-11e9-a14e-635e0fd3bfa6',1,0,0,'2019-03-27 08:23:25','2020-04-21 15:12:41',0,0);
/*!40000 ALTER TABLE `UserVerifiedInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WhyHostInfoBlock`
--

DROP TABLE IF EXISTS `WhyHostInfoBlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WhyHostInfoBlock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WhyHostInfoBlock`
--

LOCK TABLES `WhyHostInfoBlock` WRITE;
/*!40000 ALTER TABLE `WhyHostInfoBlock` DISABLE KEYS */;
INSERT INTO `WhyHostInfoBlock` VALUES (1,'Host Banner Title 1','hostBannerTitle1','Lorem ipsum dolor sit amet','2020-04-21 13:55:00','2020-04-21 15:04:49'),(2,'Host Banner Content 1','hostBannerContent1','consectetur adipiscing elit, sed do                 ','2020-04-21 13:55:00','2020-04-21 15:04:49'),(3,'Host Banner Image 1','hostBannerImage1','f225b92f65cbd9d6373fe4ec5f1d41ed.jpeg','2020-04-21 13:55:00','2020-04-21 15:04:49'),(4,'Earn Block Title 1','earnBlockTitle1','Lorem ipsum dolor sit amet','2020-04-21 13:55:00','2020-04-21 15:05:18'),(5,'Earn Block Content 1','earnBlockContent1','Lorem ipsum dolor sit amet, consectetur adipiscing elit','2020-04-21 13:55:00','2020-04-21 15:05:19'),(6,'Earn Block Content 2','earnBlockContent2','Lorem ipsum dolor sit amet, consectetur adipiscing elit','2020-04-21 13:55:00','2020-04-21 15:05:19'),(7,'Why Block Title 1','whyBlockTitle1','Lorem ipsum dolor sit amet, consectetur adipiscing elit','2020-04-21 13:55:00','2020-04-21 15:05:42'),(8,'Why Block Title 2','whyBlockTitle2','Lorem ipsum dolor sit amet, consectetur adipiscing elit','2020-04-21 13:55:00','2020-04-21 15:05:43'),(9,'Why Block Content 1','whyBlockContent1','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','2020-04-21 13:55:00','2020-04-21 15:05:43'),(10,'Why Block Content 2','whyBlockContent2','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','2020-04-21 13:55:00','2020-04-21 15:05:43'),(11,'Easy Host Title 1','easyHostTitle1','Lorem ipsum dolor sit amet, consectetur adipiscing elit','2020-04-21 13:55:00','2022-07-12 05:57:51'),(12,'Easy Host Content 1','easyHostContent1','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','2020-04-21 13:55:00','2022-07-12 05:57:51'),(13,'Easy Host Content 2','easyHostContent2','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','2020-04-21 13:55:00','2022-07-12 05:57:51'),(14,'Work Title Heading','workTitleHeading','Sed ut perspiciatis unde omnis iste natus error sit voluptatem','2020-04-21 13:55:00','2020-04-21 15:07:17'),(15,'Work Title 1','workTitle1','Sed ut perspiciatis unde omnis iste natus error sit voluptatem','2020-04-21 13:55:00','2020-04-21 15:07:17'),(16,'Work Title 2','workTitle2','Sed ut perspiciatis unde omnis iste natus error sit voluptatem','2020-04-21 13:55:00','2020-04-21 15:07:17'),(17,'Work Content 1','workContent1','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam','2020-04-21 13:55:00','2020-04-21 15:07:18'),(18,'Work Content 2','workContent2','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam','2020-04-21 13:55:00','2020-04-21 15:07:18'),(19,'Work Image 1','workImage1','f396369dd385aa9f9e532b91a26f21b5.jpeg','2020-04-21 13:55:00','2022-07-12 05:57:51'),(20,'Peace Title Heading','peaceTitleHeading','At vero eos et accusamus et iusto odio dignissimos','2020-04-21 13:55:00','2020-04-21 15:07:44'),(21,'Peace Title 1','peaceTitle1','At vero eos et accusamus et iusto odio dignissimos','2020-04-21 13:55:00','2020-04-21 15:07:44'),(22,'Peace Title 2','peaceTitle2','At vero eos et accusamus et iusto odio dignissimos','2020-04-21 13:55:00','2020-04-21 15:07:44'),(23,'Peace Title 3','peaceTitle3','At vero eos et accusamus et iusto odio dignissimos','2020-04-21 13:55:00','2020-04-21 15:07:45'),(24,'Peace Content 1','peaceContent1','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti','2020-04-21 13:55:00','2020-04-21 15:07:45'),(25,'Peace Content 2','peaceContent2','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti','2020-04-21 13:55:00','2020-04-21 15:07:45'),(26,'Peace Content 3','peaceContent3','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti','2020-04-21 13:55:00','2020-04-21 15:07:45');
/*!40000 ALTER TABLE `WhyHostInfoBlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WishList`
--

DROP TABLE IF EXISTS `WishList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WishList` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wishListGroupId` int NOT NULL,
  `listId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isListActive` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wishListGroupId` (`wishListGroupId`),
  KEY `listId` (`listId`),
  CONSTRAINT `WishList_ibfk_1` FOREIGN KEY (`wishListGroupId`) REFERENCES `WishListGroup` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `WishList_ibfk_2` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WishList`
--

LOCK TABLES `WishList` WRITE;
/*!40000 ALTER TABLE `WishList` DISABLE KEYS */;
/*!40000 ALTER TABLE `WishList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WishListGroup`
--

DROP TABLE IF EXISTS `WishListGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WishListGroup` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isPublic` int DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WishListGroup`
--

LOCK TABLES `WishListGroup` WRITE;
/*!40000 ALTER TABLE `WishListGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `WishListGroup` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-11 17:29:13
