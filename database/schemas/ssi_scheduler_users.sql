-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: draught_services
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.21.10.3

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
-- Table structure for table "scheduler_-- users"
--

DROP TABLE IF EXISTS "scheduler_users";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE "scheduler_users" (
  "user_id" varchar(100) NOT NULL,
  "user_fName" varchar(40) NOT NULL,
  "user_mName" varchar(40) DEFAULT NULL,
  "user_lName" varchar(40) NOT NULL,
  "department" varchar(50) NOT NULL,
  "subject" varchar(8) NOT NULL,
  "role" varchar(10) NOT NULL,
  PRIMARY KEY ("user_id","department","subject")
);
/*!40101 SET character_set_client = @saved_cs_client */;
CREATE INDEX "scheduler_users_user_id" on "scheduler_users"("user_id");

--
-- Dumping data for table "scheduler_-- users"
--

BEGIN;
/*!40000 ALTER TABLE "scheduler_-- users" DISABLE KEYS */;
INSERT INTO "scheduler_users" VALUES ('Carina.Fitzpatrick','Carina',NULL,'Fitzpatrick','Draught Matters','CS','admin'),('Lester.Barroso','Lester',NULL,'Barroso','ComputerScience','CS','admin');
/*!40000 ALTER TABLE "scheduler_-- users" ENABLE KEYS */;
COMMIT;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-15 11:26:08
