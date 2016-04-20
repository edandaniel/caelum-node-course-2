-- MySQL dump 10.13  Distrib 5.5.46, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: payfast
-- ------------------------------------------------------
-- Server version	5.5.46-0ubuntu0.14.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pagamentos`
--

DROP TABLE IF EXISTS `pagamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pagamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `forma_de_pagamento` varchar(255) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `moeda` varchar(3) NOT NULL,
  `status` varchar(255) NOT NULL,
  `data` date DEFAULT NULL,
  `descricao` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamentos`
--

LOCK TABLES `pagamentos` WRITE;
/*!40000 ALTER TABLE `pagamentos` DISABLE KEYS */;
INSERT INTO `pagamentos` VALUES (1,'payfast',10.00,'BRL','CRIADO','2016-04-18','descricaodacompra'),(2,'payfast',10111.00,'BRL','CRIADO','2016-04-18','descricaodacompra'),(3,'payfast',10111.00,'BRL','CRIADO','2016-04-18','descricaodacompra'),(4,'payfast',10111.00,'BRL','CRIADO','2016-04-18','descricaodacompra'),(5,'payfast',10.00,'BRL','CRIADO','2016-04-19','descricaodacompra'),(6,'payfast',10.00,'BRL','CRIADO','2016-04-19','descricaodacompra'),(7,'payfast',10.00,'BRL','CRIADO','2016-04-19','descricaodacompra'),(8,'payfast',10.00,'BRL','CRIADO','2016-04-19','descricaodacompra'),(9,'payfast',10.00,'BRL','CRIADO','2016-04-19','descricaodacompra'),(10,'payfast',10.00,'BRL','CRIADO','2016-04-19','descricaodacompra'),(11,'payfast',10.00,'BRL','CRIADO','2016-04-19','descricaodacompra'),(12,'payfast',10.00,'BRL','CRIADO','2016-04-19','descricaodacompra'),(13,'payfast',10.00,'BRL','CRIADO','2016-04-19','descricaodacompra'),(14,'payfast',10.00,'BRL','CRIADO','2016-04-19','descricaodacompra'),(15,'payfast',10.00,'BRL','CRIADO','2016-04-19','descricaodacompra'),(16,'payfast',10.00,'BRL','CRIADO','2016-04-19','descricaodacompra'),(17,'payfast',10.00,'BRL','CRIADO','2016-04-19','descricaodacompra'),(18,'payfast',10.00,'BRL','CRIADO','2016-04-19','descricaodacompra'),(19,'payfast',10.00,'BRL','CONFIRMADO','2016-04-19','descricaodacompra'),(20,'payfast',10.00,'BRL','CONFIRMADO','2016-04-19','descricaodacompra'),(21,'payfast',10.00,'BRL','CONFIRMADO','2016-04-19','descricaodacompra'),(22,'payfast',10.00,'BRL','CRIADO','2016-04-20','descricaodacompra'),(23,'payfast',10.00,'BRL','CRIADO','2016-04-20','descricaodacompra'),(24,'payfast',10.00,'BRL','CRIADO','2016-04-20','descricaodacompra'),(25,'payfast',10.00,'BRL','CRIADO','2016-04-20','descricaodacompra'),(26,'payfast',10.00,'BRL','CRIADO','2016-04-20','descricaodacompra'),(27,'payfast',10.00,'BRL','CRIADO','2016-04-20','descricaodacompra'),(28,'payfast',10.00,'BRL','CRIADO','2016-04-20','descricaodacompra'),(29,'payfast',10.00,'BRL','CRIADO','2016-04-20','descricaodacompra');
/*!40000 ALTER TABLE `pagamentos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-20 17:08:08
