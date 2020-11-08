-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: localhost    Database: job_board
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `advertissements`
--

DROP TABLE IF EXISTS `advertissements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `advertissements` (
  `idAd` int NOT NULL AUTO_INCREMENT,
  `idPeople` int DEFAULT NULL,
  `idComp` int DEFAULT NULL,
  `titre` varchar(30) DEFAULT NULL,
  `contenu` tinytext,
  PRIMARY KEY (`idAd`),
  KEY `idPeople` (`idPeople`),
  KEY `idComp` (`idComp`),
  CONSTRAINT `advertissements_ibfk_1` FOREIGN KEY (`idPeople`) REFERENCES `people` (`idPeople`),
  CONSTRAINT `advertissements_ibfk_2` FOREIGN KEY (`idComp`) REFERENCES `companies` (`idComp`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advertissements`
--

LOCK TABLES `advertissements` WRITE;
/*!40000 ALTER TABLE `advertissements` DISABLE KEYS */;
INSERT INTO `advertissements` VALUES (1,1,1,'Annonce 1','poste de dev web a pourvoir contrat 35h'),(3,2,2,'c\'est la pub trois','poste de dev logiciel a pourvoir contrat CDI 39h. Connaissances en C exige'),(4,2,2,'pub 4','Modif 5 poste de dev logiciel a pourvoir contrat CDI 39h. Connaissances en C exige');
/*!40000 ALTER TABLE `advertissements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidature`
--

DROP TABLE IF EXISTS `candidature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidature` (
  `idCand` int NOT NULL AUTO_INCREMENT,
  `idPeople` int DEFAULT NULL,
  `idAd` int DEFAULT NULL,
  `message` text,
  PRIMARY KEY (`idCand`),
  KEY `idPeople` (`idPeople`),
  KEY `idAd` (`idAd`),
  CONSTRAINT `candidature_ibfk_1` FOREIGN KEY (`idPeople`) REFERENCES `people` (`idPeople`),
  CONSTRAINT `candidature_ibfk_2` FOREIGN KEY (`idAd`) REFERENCES `advertissements` (`idAd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidature`
--

LOCK TABLES `candidature` WRITE;
/*!40000 ALTER TABLE `candidature` DISABLE KEYS */;
/*!40000 ALTER TABLE `candidature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `idComp` int NOT NULL AUTO_INCREMENT,
  `idPeople` int DEFAULT NULL,
  `nom` varchar(30) DEFAULT NULL,
  `adresse` varchar(75) DEFAULT NULL,
  `mail` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idComp`),
  UNIQUE KEY `mail` (`mail`),
  KEY `idPeople` (`idPeople`),
  CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`idPeople`) REFERENCES `people` (`idPeople`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,1,'Comp1','3 place paul bec','comp1@mail.fr'),(2,2,'Comp2','3 place paul bec','comp2@mail.fr');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `people`
--

DROP TABLE IF EXISTS `people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `people` (
  `idPeople` int NOT NULL AUTO_INCREMENT,
  `lastName` varchar(30) DEFAULT NULL,
  `firstName` varchar(75) DEFAULT NULL,
  `statut` varchar(20) DEFAULT NULL,
  `mail` varchar(75) DEFAULT NULL,
  `mdp` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idPeople`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `people`
--

LOCK TABLES `people` WRITE;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
INSERT INTO `people` VALUES (1,'Jeremy','Nayet','admin','jeremy@mail.fr','epitech'),(2,'Josselin','Gerstmayer','admin','josselin@mail.fr','epitech');
/*!40000 ALTER TABLE `people` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-05 14:15:06
